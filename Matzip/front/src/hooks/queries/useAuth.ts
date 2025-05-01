import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';

// mutationOptions를 따로 받아오는 이유
// 공통 처리 로직은 내부에서 수행하고 onSuccess, onError와 같이 외부에서도 옵션을 커스텀하게 주입하여 확장성 및 재사용성을 높이기 위함
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      // useGetRefreshToken의 자동갱신 로직들(refetchInterval..)도 같이 초기화하기 위해 즉시 리패칭
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      // 데이터를 무효화하여 stale 상태로 표시만하고 즉시 리패칭 X
      // 이후 해당 컴포넌트 마운트 시 자동 재요청
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

// accessToken 및 refreshToken 갱신
function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 27분,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 데이터 자동갱신 시간간격
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`); // accessToken을 헤더에 추가
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken); // refreshToken을 스토리지에 저장
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization'); // accessToken을 헤더에서 제거
      removeEncryptStorage(storageKeys.REFRESH_TOKEN); // refreshToken을 스토리지에서 제거
    }
  }, []);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({enabled: refreshTokenQuery.isSuccess}); // accessToken이 성공적으로 갱신된 경우에만 프로필 요청

  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    getProfileQuery,
    isLogin,
  };
}

export default useAuth;
