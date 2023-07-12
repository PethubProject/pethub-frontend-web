import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserState } from "../state/User";

export const useUserRole = () => {
  const user = useRecoilValue(UserState);
  if (user.role === "VET") {
  }
  if (user.role === "OWNER") {
  }
};

export const useScaleChange = (init) => {
  const [record, setRecord] = useState([]);

  const [scale, setScale] = useState(1);
  const [prevDiff, setPrevDiff] = useState(-1);
  const [active, setActive] = useState(true);
  const [zoomWeight, setZoomWeight] = useState(init?.zoomWeight || 0.05);
  const onTouchStart = useCallback((e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
    const touches = e.changedTouches;
    console.log(touches);
    setRecord((p) => (p.length + touches.length <= 2 ? [...p, ...Object.values(touches).map((t) => t)] : p));
  }, []);

  const onTouchEnd = useCallback((e) => {
    const touches = e.changedTouches;
    setRecord((p) => {
      for (let touch of touches) {
        const index = p.findIndex((cachedEv) => cachedEv.identifier === touch.identifier);
        if (index > -1) {
          p.splice(index, 1);
        }
      }
      return p;
    });
  }, []);
  const onTouchMove = useCallback((e) => {
    const touches = e.changedTouches;
    setRecord((p) => {
      for (let touch of touches) {
        const index = p.findIndex((cachedEv) => cachedEv.identifier === touch.identifier);
        if (index !== -1) {
          p[index] = touch;

          if (p.length === 2) {
            const xDiff = p[0].clientX - p[1].clientX;
            const yDiff = p[0].clientY - p[1].clientY;
            let curDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            setPrevDiff((d) => {
              if (d > 0) {
                const zoom = curDiff - d;

                setScale((s) => {
                  s = s + (zoom > 0 ? zoomWeight : -zoomWeight);
                  if (init?.minZoom && Math.abs(s) < init.minZoom) {
                    s = s < 0 ? -1 : 1;
                  }
                  if (init?.maxZoom && Math.abs(s) > init.maxZoom) {
                    s = init.maxZoom;
                  }
                  return s;
                });
              }
              return curDiff;
            });
          }
        }
      }
      return p;
    });
  }, []);

  useEffect(() => {
    if (active) {
      document.addEventListener("touchstart", onTouchStart, { passive: false });
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd, { passive: false });
      document.addEventListener("touchcancel", onTouchEnd, { passive: false });
      return () => {
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.removeEventListener("touchcancel", onTouchEnd);
      };
    }
  }, [active, onTouchStart, onTouchMove, onTouchEnd, init]);
  console.log(scale);
  return { scale, setActive, setZoomWeight, setScale };
};
