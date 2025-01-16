import { INewUser } from '@/types';
import {
  useQuery, // for fetching data
  useMutation, // for modifying data
  useQueryClient, // for enabling direct interaction with the cache.
  useInfiniteQuery, // for facilitating infinite scrolling or "load more" patterns.
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api';


export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  })
}


export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: {email: string, password: string}) => signInAccount(user),
  })
}


export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}