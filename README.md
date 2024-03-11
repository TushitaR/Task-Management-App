## Start the application locally:
1.	Clone the project locally:
    git clone <repository_https_url>
2.	Open the project in an editor:
    Open the project directory in your preferred code editor (e.g., Visual Studio Code).
    Navigate to the project directory in the terminal.
3.	Start the application:
    Open a new terminal within your editor.
    Navigate to the project directory if you're not already there.
    Start the application by running the following command: ng serve
4.	This will initiate the development server, and you'll be provided with a local URL:             localhost:4200.
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
