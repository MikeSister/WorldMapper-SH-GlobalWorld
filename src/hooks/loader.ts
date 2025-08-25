import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import demoData from "../data/demo.json";
import aiJSON from "../data/ai.json";
import {
  loaderStart,
  loaderSuccess,
  loaderFail,
  aiSummarySuccess,
  aiSummaryStart,
  aiSummaryFail,
  setCurrentYear,
} from "../redux/store";
import axios from "axios";
import type { EarthDataItem } from "../type";
import dayjs from "dayjs";

export const useDataLoader = () => {
  const dispatch = useAppDispatch();
  const currentYear = useAppSelector((state) => state.year.currentYear);
  return useCallback(() => {
    dispatch(loaderStart());
    
    return Promise.resolve({
          earthData: demoData.concat([]) as unknown as EarthDataItem[],
        })
      .then((res) => {
        setTimeout(() => {
          dispatch(loaderSuccess(res));
          dispatch(
            setCurrentYear(dayjs(res.earthData[0].date).year())
          );
        }, 1200);
      })
      .catch((err) => {
        dispatch(loaderFail(err.message));
      });
  }, [currentYear]);
};

const requestAI = (week: string): Promise<{ data: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: (aiJSON as any)[week],
      });
    }, 1200);
  });
  return axios.request({
    url: "api/query-summary-by-ai",
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data: {
      prompt: "",
      wmweek: week,
    },
  });
};

export const useAISummary = () => {
  const dispatch = useAppDispatch();
  const currentYear = useAppSelector((state) => state.year.currentYear);
  const refWeek = useRef(currentYear);
  refWeek.current = currentYear;

  useEffect(() => {
    const week = currentYear;
    if (!week) {
      return;
    }
    dispatch(aiSummaryStart());
    requestAI(week)
      .then((res) => {
        if (week !== refWeek.current) {
          return;
        }
        dispatch(aiSummarySuccess({ content: res.data as string, week }));
      })
      .catch((err) => {
        if (week !== refWeek.current) {
          return;
        }
        dispatch(aiSummaryFail(err.message));
      });
  }, [currentYear]);
};
