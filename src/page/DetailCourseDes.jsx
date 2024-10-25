import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Desci from '../component/CourseDescription/Desci';
import Error from '../component/CourseDescription/Error';
import Footer from '../component/Footer/Footer';

const DetailCourseDes = () => {
  const URL = useLocation();
  const [callError, setCallError] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const path = URL.pathname.split('/').at(-1);

  useEffect(() => {
    setCourseData([]);
    setCallError(null);

    const fetchCourseDetails = async () => {
      setLoading(true);

      const url = `${import.meta.env.REACT_APP_BASE_URL}getParticularCourseDetails`;
      const data = { courseId: path };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          setCallError('Network response was not ok');
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.success) {
          console.log(result.data)
          setCourseData(result.data);
        }
      } catch (error) {
        setCallError(`There was a problem with the fetch operation: ${error}`);
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [path]);

  return (
    <>
      <div className="bg-[#000814]  border-t-2 border-gray-600 w-full min-h-screen flex justify-center items-center">
        {loading  ? (
          <p className="text-yellow-400 text-4xl font-semibold">Loading...</p>
        ) : callError !== null ? (
          <Error callError={callError} />
        ) : (
          <Desci course={courseData} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default DetailCourseDes;
