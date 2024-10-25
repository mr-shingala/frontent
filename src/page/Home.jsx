import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './style1.css'
import Text from '../component/homePage/Text';
import Button from '../component/homePage/Button'
import Block1 from '../component/homePage/Block1';
import Block2 from '../component/homePage/Block2'
import Card from '../component/homePage/Card';
import Sectionimage from '../component/homePage/Sectionimage';
import Language from '../component/homePage/Language';
import InstructorSection from '../component/homePage/InstructorSection';
import Footer from '../component/Footer/Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {

   useEffect(() => {
      AOS.init({
        duration: 1000, // Duration of animation in milliseconds
      });
    }, []);

    const apiUrl = process.env.REACT_APP_BASE_URL;


console.log(`API Base URL: ${import.meta.env.REACT_APP_BASE_URL}`);

 const code = [`<!DOCTYPE html>`,`<html lang="en">`,`<head>`,`<meta charset="UTF-8">`,`<title>My Simple Page</title>`,`</head>`,`<body>`,`<h1>Welcome to My Page!</h1>`,`<p>This is a basic HTML.</p>`,`</body>`,`</html>`]
 const code1 = [`#include <stdio.h>`,`int main() {`,`int n, i;`,`unsigned long long fact = 1;`,`printf("Enter an integer: ");`,`    scanf("%d", &n);`,`    for(i = 1; i <= n; ++i) {`,`fact *= i;`,`}`,`return 0;`,`}`]

 return (
  <div>

   {/* section1 */}
   <div className='bg-[#000a18]'>
    {/* section 1.1 (hero section + video) */}
    <div className='flex-col flex '>
     {/* hero section */}
     <div className='flex flex-col  items-center mt-20  lg:mx-5' data-aos="fade-down">
      <Link to="/signup">
       <div className='bg-[#161d29] justify-center text-slate-300 text-base p-4 font-semibold rounded-full  flex items-center gap-3 shadow-[0px -1px 0px 0px #FFFFFF2E inset] boxshadow hover:scale-105 duration-150'>
        Become an Instructor
        <FaArrowRight />
       </div>
      </Link>
      <p className='text-[#F1F2FF] text-center lg:leading-snug sm:text-3xl xl:px-4 xl:mb-6  leading-loose inline-block font-semibold text-5xl mt-10'>Empower Your Future With <Text>Coding Skill</Text></p>
      <p className='text-[#abb0bb] text-center font-medium max-w-[1030px] xl:px-4 mt-2 mb-9 text-xl'>
       With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
      </p>
      <div className='gap-6 flex pb-5 boxshadow5 relative sm:flex-col mb-6'>
       <Button active={true} text={"Lern More"}></Button>
       <Button active={false} text={"Book a Demo"}></Button>
      </div>
     </div>

     {/* video */}

     <div className='mt-14 flex flex-col items-center relative z-50 pb-11   mx-auto' >
      <div className='w-[90%]  border-8 border-gray-700  rounded-md max-h-[600px] overflow-y-hidden'>
       <video src="https://res.cloudinary.com/dlgm6g3gn/video/upload/v1728123983/homepage_final.mp4_1728123800411_cebnsc.mp4" loop muted autoPlay type="mp4" className=''></video>
      </div>
     </div>
     {/* <div className='w-[70%]  h-[550px] bg-slate-50 opacity-75 absolute cursor-not-allowed'></div> */}
    </div>
    {/* section1.2 */} 
    <div data-aos="zoom-in" className='flex justify-center max-w-[1500px] lg1:gap-28  gap-16  lg1:items-center lg1:flex-col mx-auto md:px-7 px-14 lg1:pt-10 pt-32 pb-20 '>
    {/* heading,text,button1Text */}
       <Block1 
       text={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
       button1Text={'Try it Yourself '}> Unlock your <Text>coding potential</Text> with our online courses.
       </Block1>    
       <Block2 
       code={code}></Block2>

    </div>
    <div data-aos="zoom-in" className='flex justify-center max-w-[1500px] lg1:flex-col  lg1:items-center mx-auto px-14  gap-16 md:px-7 md:pt-0  pt-16  flex-row-reverse '>
    {/* heading,text,button1Text */}
       <Block1 
       text={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
       button1Text={'Continue Lesson '}>Start <Text>coding in seconds</Text>
       </Block1>    
       <Block2 code={code1}></Block2>

    </div>
    {/* card section 1.3 */}
    <Card></Card>
   </div>
   {/* section2 */}
    <div className='bg-[#F9F9F9] '>
       {/* section2.1 */}
       <div className='bg-image flex items-center gap-6 justify-center'>
             <Button active={true} text={'Explore Full Catelog'} icon={<FaArrowRight />}></Button>
             <Button active={false} text={"Lern More"}></Button>
       </div>
       {/* section2.2 */}
        <div>
          <Sectionimage></Sectionimage>
          <Language></Language>
       </div>
    </div>
    {/* section3 */}
    <div>
       {/* section3.1 */}
        <InstructorSection></InstructorSection>
       {/* section3.2 */}
       <div>
          
       </div>
    </div>
    <Footer></Footer>


  </div>
 )
}

export default Home
