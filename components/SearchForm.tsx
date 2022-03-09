import { Formik, Form, Field } from "formik";
import { SearchProps, YoutubeVideo } from "lib/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { BarLoader } from "react-spinners";

const SearchForm: FC<{ play: (url: string) => void }> = ({ play }) => {
  const initialValues: SearchProps = { query: "" };
  const [results, setResults] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  return (
    <div className="mb-10">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          if (!values.query) return;
          setLoading(true);
          const res = await fetch("/api/search?query=" + values.query).finally(
            () => setLoading(false)
          );
          const data: YoutubeVideo[] = await res.json();
          setLoading(false);
          console.log(data);
          setResults(data);
          actions.setSubmitting(false);
        }}
      >
        <Form className="input-group mx-auto">
          <Field
            className="input input-bordered w-full"
            id="query"
            name="query"
            placeholder="Search"
          />
          <button type="submit" className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </Form>
      </Formik>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 mt-4">
        {loading ? (
          <BarLoader width="100%" loading={loading} color="#6377f7" />
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              className="card card-compact lg:w-96 md:w-96 sm:w-[98vw] w-[98vw] bg-base-100 shadow-xl mx-auto"
            >
              <figure>
                <Modal track={title} />
                <Image
                  src={
                    (item.bestThumbnail && item.bestThumbnail.url) ??
                    "https://api.lorem.space/image/album?w=400&h=225"
                  }
                  alt="Youtube Thumbnail"
                  width="400px"
                  height="225px"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.author && item.author.name}</p>
                <div className="card-actions justify-end">
                  <label
                    htmlFor="my-modal"
                    className={`btn btn-primary ${
                      buttonLoading ? "cursor-not-allowed btn-disabled" : ""
                    }`}
                    onClick={() => {
                      play(item.url);
                      setTitle(item.title);
                      setButtonLoading(true);
                      setTimeout(() => setButtonLoading(false), 5000);
                    }}
                  >
                    Add to queue
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Modal: FC<{ track: string | null }> = ({ track }) => (
  <>
    <input type="checkbox" id="my-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box relative">
        <label
          htmlFor="my-modal"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg text-green-400 font-bold">Success</h3>
        <p className="py-4">
          Added <strong>{track}</strong> to your queue.
        </p>
      </div>
    </div>
  </>
);

export default SearchForm;
