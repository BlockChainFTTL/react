import {gql} from '@apollo/client'

export const createProfile = gql`
    mutation CreateProfile(
    $handle: CreateHandle! = "luigi_esgi"
    $profilePictureUri: Url = null
    $followModule: FollowModuleParams = null
    $followNFTURI: Url = null
    ) {
    createProfile(
        request: {
        handle: $handle
        profilePictureUri: $profilePictureUri
        followNFTURI: $followNFTURI
        followModule: $followModule
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