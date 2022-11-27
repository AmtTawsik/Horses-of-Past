import React from "react";

const Blogs = () => {
  return (
    <div>
      {/* page Title */}

      <h1 className="text-center mt-6 mb-2 text-5xl font-extrabold text-green-600">
        Blogs
      </h1>
      <hr />
      <div>
        {/* Blog-1 */}
        <div className="bg-teal-300 p-10 m-10 rounded-lg">
          <h1 className="text-2xl text-amber-600 font-extrabold">Blog-1</h1>
          <h5 className="text-xl text-cyan-800 font-bold">
            What are the different ways to manage a state in a React
            application?
          </h5>
          <p className="font-mono font-bold text-fuchsia-800">
            Different ways to manage a state in a React application:
            <br />
            1. Reacting to input with state <br />
            2. Choosing the state structure
            <br />
            3. Sharing state between components <br />
            4. Preserving and resetting state
            <br />
            5. Extracting state logic into a reducer <br />
            6. Passing data deeply with context
            <br />
            7. Scaling up with reducer and context
            <br />
          </p>
        </div>

        {/* Blog-2 */}
        <div className="bg-teal-300 p-10 m-10 rounded-lg">
          <h1 className="text-2xl text-amber-600 font-extrabold">Blog-2</h1>
          <h5 className="text-xl text-cyan-800 font-bold">
            How does prototypical inheritance work?
          </h5>
          <p className="font-mono font-bold text-fuchsia-800">
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
            Traditionally, in order to get and set the Prototype of an object,
            we use Object. getPrototypeOf and Object.
            <br />
            When it comes to inheritance, JavaScript only has one construct:
            objects. Each object has a private property which holds a link to
            another object called its prototype. That prototype object has a
            prototype of its own, and so on until an object is reached with null
            as its prototype.
          </p>
        </div>

        {/* Blog-3 */}
        <div className="bg-teal-300 p-10 m-10 rounded-lg">
          <h1 className="text-2xl text-amber-600 font-extrabold">Blog-3</h1>
          <h5 className="text-xl text-cyan-800 font-bold">
            What is a unit test? Why should we write unit tests?
          </h5>
          <p className="font-mono font-bold text-fuchsia-800">
            A unit test is a way of testing a unit - the smallest piece of code
            that can be logically isolated in a system. In most programming
            languages, that is a function, a subroutine, a method or property.
            The isolated part of the definition is important. In his book
            "Working Effectively with Legacy Code", author Michael Feathers
            states that such tests are not unit tests when they rely on external
            systems: “If it talks to the database, it talks across the network,
            it touches the file system, it requires system configuration, or it
            can't be run at the same time as any other test." <br /> <br />
            Unit testing ensures that all code meets quality standards before
            it's deployed. This ensures a reliable engineering environment where
            quality is paramount. Over the course of the product development
            life cycle, unit testing saves time and money, and helps developers
            write better code, more efficiently
          </p>
        </div>

        {/* Blog-4 */}
        <div className="bg-teal-300 p-10 m-10 rounded-lg">
          <h1 className="text-2xl text-amber-600 font-extrabold">Blog-4</h1>
          <h5 className="text-xl text-cyan-800 font-bold">
            React vs. Angular vs. Vue?
          </h5>
          <p className="font-mono font-bold text-fuchsia-800">
            <strong>React: </strong>
            Image result for what is react React is a JavaScript library
            developed by Facebook which, among other things, was used to build
            Instagram.com. Its aim is to allow developers to easily create fast
            user interfaces for websites and applications alike. The main
            concept of React. js is virtual DOM <br /><br />
            <strong>Angular: </strong>
            Angular is an open-source, JavaScript framework written in
            TypeScript. Google maintains it, and its primary purpose is to
            develop single-page applications. As a framework, Angular has clear
            advantages while also providing a standard structure for developers
            to work with <br /><br />
            <strong>Vue: </strong>
            Vue (pronounced /vjuː/, like view) is a JavaScript framework for
            building user interfaces. It builds on top of standard HTML, CSS,
            and JavaScript and provides a declarative and component-based
            programming model that helps you efficiently develop user
            interfaces, be they simple or complex. <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
