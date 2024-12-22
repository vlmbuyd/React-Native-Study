import {useMutation, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';

function useSignup(mutationOPtions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOPtions,
  });
}

function useLogin(mutationOPtions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    // 요청의 성공, 실패 여부 상관없이 항상 실행
    // 비동기 작업 완료 후 공통적으로 수행해야 할 작업 정의 시 사용
    onSettled: () => {
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      // 해당 쿼리키를 stale 상태로 변경
      // -> 기존에 캐시된 데이터를 사용할 수 없도록 하여 이후 호출 시에 최신 데이터를 다시 가져오도록 트리거
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
    },
    ...mutationOPtions,
  });
}

function useGetRefreshToken(mutationOPtions?: UseMutationCustomOptions) {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 27, // 27분 동안 쿼리 데이터를 '신선'한 상태로 간주
    refetchInterval: 1000 * 60 * 27, //27분마다 쿼리를 재실행하여 새 토큰 가져옴
    refetchOnReconnect: true, // 네크워크 재연결 시 쿼리 다시 실행
    refetchIntervalInBackground: true, //백그라운드에 있을 때도 새 토큰 가져옴
  });

  useEffect(() => {
    if (isSuccess) {
      setEncryptStorage('refreshToken', data.refreshToken);
      setHeader('Authorization', `Bearer ${data.accessToken}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOPtions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
    ...mutationOPtions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    isLogin,
    getProfileQuery,
  };
}

export default useAuth;
