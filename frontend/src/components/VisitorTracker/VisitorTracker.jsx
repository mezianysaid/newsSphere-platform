import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementVisitor } from "../../store/slices/visitorSlice";

const VisitorTracker = () => {
  const dispatch = useDispatch();
  const visitorCount = useSelector((state) => state.visitors.count);
  useEffect(() => {
    // Check if this is a new session
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      // Increment visitor count
      dispatch(incrementVisitor());
      // Mark this session as visited
      sessionStorage.setItem("hasVisited", "true");
    }
  }, [dispatch, visitorCount]);
};

export default VisitorTracker;
