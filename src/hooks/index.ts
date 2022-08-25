import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { TRootState, TAppDispatch } from '../services/store'

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;