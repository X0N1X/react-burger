import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {TRootState, TAppDispatchWithThunk} from '../services/store'

export const useAppDispatch: () => TAppDispatchWithThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;