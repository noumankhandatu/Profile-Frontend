// components/CustomCard.js

import React from "react";

const Profile = () => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.hollywoodreporter.com/wp-content/uploads/2014/01/nas_portrait_a_p.jpg?w=2000&h=1126&crop=1')",
        }}
        title="Woman holding a mug"
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">Hello username</div>
          <p className="text-gray-700 text-base">This is my profile</p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://www.hollywoodreporter.com/wp-content/uploads/2014/01/nas_portrait_a_p.jpg?w=2000&h=1126&crop=1"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Nouman</p>
            <p className="text-gray-600">Male</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
