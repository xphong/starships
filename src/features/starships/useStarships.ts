import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getStarshipsByPage,
  selectStarships,
  selectStarshipsLoading,
  selectStarshipsError,
  selectStarshipsPrevious,
  selectStarshipsNext,
} from './starshipsSlice';

const useStarships = () => {
  const starships = useAppSelector(selectStarships);
  const isLoadingStarships = useAppSelector(selectStarshipsLoading);
  const isErrorStarships = useAppSelector(selectStarshipsError);
  const previousStarships = useAppSelector(selectStarshipsPrevious);
  const nextStarships = useAppSelector(selectStarshipsNext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getStarshipsByPage());
  }, [dispatch]);

  return {
    starships,
    isLoadingStarships,
    isErrorStarships,
    previousStarships,
    nextStarships,
    dispatchGetStarshipsByPage: (page: string | undefined) => dispatch(getStarshipsByPage(page)),
  }
}

export default useStarships