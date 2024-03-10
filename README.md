## Start the application locally:
1.	Clone the project locally:
    Clone the project repository using the provided link: 
2.	Open the project in an editor:
    Open the project directory in a code editor such as Visual Studio Code or any editor of your choice.
3.	Start the application:
    Open a new terminal within your editor.
    Navigate to the project directory if you're not already there.
    Start the application by running the following command: ng serve
4.	This will initiate the development server, and you'll be provided with a local URL: localhost:4200.
5.	Open this URL in a web browser of your choice to view the application.

## Start the Json Server:
1.	Open a new terminal:
    Open another terminal, separate from the one used to run the Angular application.
2.	Start the JSON Server:
    Run the following command to start the JSON server: json-server --watch db.json
3.	If you prefer to use a different port, specify it with the --port option: json-server --watch db.json --port 3200
4.	This will start the JSON server on either port 3000 (default) or the port you've specified.

## Test the application:
1.	Open a new terminal:
    Open a new terminal window or tab.
2.	Run tests:
    Type the following command to run the tests: ng test 
3.	This command will execute all unit tests for the application.

## Introduction:

Welcome to our Task Management Application built with Angular! This application offers a comprehensive solution for organizing and managing tasks efficiently. With its intuitive user interface and robust features, users can stay on top of their to-do lists effortlessly.

## Angular Features:

1. Angular Components: Each view (task list, task details, create task, edit task) is implemented as an Angular component, ensuring modularity and maintainability.

2. Two-Way Data Binding: We employ two-way data binding where necessary to synchronize the UI and data, providing users with real-time updates.

3. Angular Services and Dependency Injection: Data management is handled through Angular services, utilizing dependency injection for efficient sharing of data and functionality across components.

4. Routing and Navigation: Angular Router is leveraged to manage routing and navigation between different views, offering seamless transitions and a cohesive user experience.

5. Error Handling: Error handling is implemented to gracefully manage errors, displaying meaningful error messages to users when necessary, ensuring a smooth user experience.

## Testing:

1. Unit Tests: Critical parts of the application, such as the task service and form validation, are thoroughly tested using Angular testing tools like TestBed and Jasmine, ensuring reliability and robustness.

With these features and testing practices in place, our Task Management Application delivers a seamless and reliable solution for organizing tasks effectively. Let's optimize your task management workflow with Angular!