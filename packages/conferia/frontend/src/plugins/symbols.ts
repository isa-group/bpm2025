import type { InjectionKey } from 'vue';
import type { AxiosInstance } from 'axios';
import type { RemovableRef } from '@vueuse/core';

export const accessTokenKey = Symbol() as InjectionKey<RemovableRef<string | undefined>>;
export const refreshTokenKey = Symbol() as InjectionKey<RemovableRef<string | undefined>>;
export const userIdKey = Symbol() as InjectionKey<RemovableRef<string | undefined>>;
export const axiosKey = Symbol() as InjectionKey<AxiosInstance>;
export const userDetailsKey = Symbol();
