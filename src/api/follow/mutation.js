import {gql} from '@apollo/client'

export const mutationFollowProfile = gql`
    mutation CreateFollowTypedData ($profile: ProfileId) {
        createFollowTypedData(request:{
        follow: [
            {
            profile: $profile,
            followModule: null
            }
        ]
        }) {
        id
        expiresAt
        typedData {
            domain {
            name
            chainId
            version
            verifyingContract
            }
            types {
            FollowWithSig {
                name
                type
            }
            }
            value {
            nonce
            deadline
            profileIds
            datas
            }
        }
        }
    }`