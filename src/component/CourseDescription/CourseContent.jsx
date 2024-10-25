import React, { useState, useEffect } from "react";
import { RxDotFilled } from "react-icons/rx";
import { RxDropdownMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CgLogIn } from "react-icons/cg";
import { useRef } from "react";
import "../../page/style1.css";

const CourseContent = ({ content, totalduration }) => {
  //console.log("content", content);
  const [count, setCount] = useState(0);
  const [collapes, setCollapes] = useState(false);
  const [tarnsition, setTansition] = useState(false);
  const [indexvalue, setIndex] = useState(null);
  const detailstag = useRef();
  const expandDiv = useRef();

  useEffect(() => {
    let total = 0;

    if (content?.courseContent?.length > 0) {
      total = content.courseContent.reduce((acc, data) => {
        return acc + (data?.subsection?.length || 0);
      }, 0);
    }

    setCount(total);
  }, [content]);

  return (
    <div className="">
      <p className="text-white text-3xl mb-3 font-bold md:ml-2 ">
        Course content
      </p>

      <div className="flex  text-gray-400 items-center justify-between md:flex-col md:items-start md:gap-5">
        <div className="flex gap-3 items-center md:flex-col md:items-start md:gap-1 md:ml-2">
          <p>{content?.courseContent?.length} sections</p>
          <RxDotFilled className="md:hidden" />
          <p>{count} lectures / SubSection</p>
          <RxDotFilled className="md:hidden" />
          <p>{totalduration} total length</p>
        </div>
        <div>
          <p
            className="text-yellow-400 cursor-pointer"
            onClick={() => {
              setCollapes(!collapes);
            }}
          >
            {!collapes ? "Expands all sections" : "Collapse all sections"}
          </p>
        </div>
      </div>

      <div className="mt-5 text-white ">
        {content &&
          content.courseContent &&
          content.courseContent.length > 0 &&
          content.courseContent.map((data, Parentindex) => {
            return (
              <details key={Parentindex} open={collapes} ref={detailstag}>
                <summary
                  className=" py-4 px-4 bg-[#2c333f] flex justify-between md:flex-col border-2 border-gray-600"
                  onClick={(e) => setTansitionValue(e, Parentindex)}
                >
                  <div className="flex items-center gap-2 cursor-pointer md:items-start">
                    <div>
                      <RxDropdownMenu className="text-2xl" />
                    </div>
                    <p>{data.section}</p>
                  </div>
                  <div className="flex gap-7 md:pl-7 md:mt-2">
                    <p className="text-yellow-400">
                      {data?.subsection?.length} lectures
                    </p>
                  </div>
                </summary>

                <div className="pb-5 pt-4 border-2 border-gray-600 text-gray-400">
                  {content?.courseContent[Parentindex]?.subsection.map(
                    (data, index) => {
                      return (
                        <div
                          key={index}
                          ref={expandDiv}
                          className={`flex items-center justify-between py-2 sm:flex-col sm:items-start w-[95%] px-3 mx-auto  duration-300 ease-in  translate-y-0 `}
                        >
                          <div
                            className={`flex items-center gap-2 sm:items-start cursor-pointer `}
                          >
                            <div>
                              {" "}
                              <MdOutlineOndemandVideo className="font-extrabold text-xl" />{" "}
                            </div>

                            <p>{data.subSectionName}</p>
                          </div>
                          <p className="sm:pl-7 sm:text-yellow-400">
                            {data.timeDuration}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </details>
            );
          })}
      </div>
    </div>
  );
};

export default CourseContent;
