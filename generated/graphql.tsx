import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GraphqlMutualGuilds = {
  __typename?: 'GraphqlMutualGuilds';
  exclude?: Maybe<Scalars['Boolean']>;
  features: Array<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  owner: Scalars['Boolean'];
  permissions: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
};

export type MutualGuilds = {
  __typename?: 'MutualGuilds';
  guilds: Array<GraphqlMutualGuilds>;
};

export type Query = {
  __typename?: 'Query';
  getGuilds?: Maybe<MutualGuilds>;
  me: UserInfo;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  avatar: Scalars['String'];
  id: Scalars['Float'];
  uid: Scalars['String'];
  username: Scalars['String'];
};

export type RegularGuildsFragment = { __typename?: 'MutualGuilds', guilds: Array<{ __typename?: 'GraphqlMutualGuilds', id: string, name: string, icon?: string | null, exclude?: boolean | null }> };

export type RegularUserFragment = { __typename?: 'UserInfo', id: number, uid: string, username: string, avatar: string };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: boolean };

export type MutualGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type MutualGuildsQuery = { __typename?: 'Query', getGuilds?: { __typename?: 'MutualGuilds', guilds: Array<{ __typename?: 'GraphqlMutualGuilds', id: string, name: string, icon?: string | null, exclude?: boolean | null }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserInfo', id: number, uid: string, username: string, avatar: string } };

export const RegularGuildsFragmentDoc = gql`
    fragment RegularGuilds on MutualGuilds {
  guilds {
    id
    name
    icon
    exclude
  }
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on UserInfo {
  id
  uid
  username
  avatar
}
    `;
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const MutualGuildsDocument = gql`
    query MutualGuilds {
  getGuilds {
    ...RegularGuilds
  }
}
    ${RegularGuildsFragmentDoc}`;

/**
 * __useMutualGuildsQuery__
 *
 * To run a query within a React component, call `useMutualGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMutualGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMutualGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMutualGuildsQuery(baseOptions?: Apollo.QueryHookOptions<MutualGuildsQuery, MutualGuildsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MutualGuildsQuery, MutualGuildsQueryVariables>(MutualGuildsDocument, options);
      }
export function useMutualGuildsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MutualGuildsQuery, MutualGuildsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MutualGuildsQuery, MutualGuildsQueryVariables>(MutualGuildsDocument, options);
        }
export type MutualGuildsQueryHookResult = ReturnType<typeof useMutualGuildsQuery>;
export type MutualGuildsLazyQueryHookResult = ReturnType<typeof useMutualGuildsLazyQuery>;
export type MutualGuildsQueryResult = Apollo.QueryResult<MutualGuildsQuery, MutualGuildsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;