import {gql} from '@apollo/client'

export const createProfile = gql`
    mutation CreateProfile(
    $handle: CreateHandle!) {
    createProfile(
        request: {
        handle: $handle
        profilePictureUri: null
        followNFTURI: null
        followModule: null
        }
    ) {
        ... on RelayerResult {
        txHash
        }
        ... on RelayError {
        reason
        }
        __typename
    }
    }
`