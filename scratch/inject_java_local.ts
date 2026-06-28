import * as fs from 'fs';
import * as path from 'path';

const questionBank: Record<string, { pretest: any[], posttest: any[] }> = {
  "java-e6-1": {
    pretest: [
      { question: "What is an exception in Java?", options: ["A syntax error caught at compile time", "An unexpected event that disrupts normal execution flow", "A comment ignored by compiler", "A system reload"], answerIndex: 1 },
      { question: "Which keyword introduces a block of code to monitor for exceptions?", options: ["catch", "try", "throw", "finally"], answerIndex: 1 },
      { question: "Which block catches and handles exceptions thrown in try?", options: ["try", "catch", "throws", "finally"], answerIndex: 1 },
      { question: "What happens to subsequent try block code after an exception is thrown?", options: ["It continues to execute", "It is skipped", "It is compiled again", "It returns default value"], answerIndex: 1 },
      { question: "Which block executes cleanup code regardless of whether an exception occurred?", options: ["catch", "finally", "throws", "try"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the base class for all exceptions in Java?", options: ["java.lang.Exception", "java.lang.Throwable", "java.lang.Error", "java.lang.RuntimeException"], answerIndex: 1 },
      { question: "What exception is thrown by division by zero in integer arithmetic?", options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "IOException"], answerIndex: 1 },
      { question: "Can a finally block execute if JVM exits via System.exit(0)?", options: ["Yes, always", "No, it terminates immediately", "Only if inside thread", "Only on Windows OS"], answerIndex: 1 },
      { question: "Can a try block exist without a catch or finally block?", options: ["Yes, standard try", "No, it must have at least one catch or finally", "Only inside main", "Only in static classes"], answerIndex: 1 },
      { question: "If an exception is not caught:", options: ["It is silently ignored", "Program terminates abnormally with stack trace", "It executes finally twice", "It retries the operation"], answerIndex: 1 }
    ]
  },
  "java-e6-2": {
    pretest: [
      { question: "Can a single try block be associated with multiple catch blocks?", options: ["No, only one catch block per try", "Yes, to handle different exceptions", "Only if finally is missing", "Only in abstract classes"], answerIndex: 1 },
      { question: "In what order must catch blocks be declared?", options: ["Generic exception classes first", "Subclass exception classes before superclass exception classes", "Random order", "Alphabetical order"], answerIndex: 1 },
      { question: "What happens if a superclass exception catch block is written before a subclass exception catch block?", options: ["It runs successfully", "Compilation error due to unreachable code", "It matches dynamically at runtime", "It throws ExceptionException"], answerIndex: 1 },
      { question: "When an exception occurs, how many catch blocks are executed?", options: ["All catches", "At most one", "Exactly two", "None"], answerIndex: 1 },
      { question: "What is multi-catch introduced in Java 7?", options: ["Running multiple catch blocks concurrently", "Catching multiple exceptions in a single catch block using '|'", "Defining multiple try blocks", "Generating multiple exceptions"], answerIndex: 1 }
    ],
    posttest: [
      { question: "If code throws NullPointerException, which catch matches: catch(Exception e) or catch(NullPointerException e) if both are valid?", options: ["catch(Exception e)", "The first one matched, which must be NullPointerException if ordered correctly", "Both run", "None match"], answerIndex: 1 },
      { question: "If an exception is caught by a catch block, does execution flow continue below the try-catch hierarchy?", options: ["No, it terminates", "Yes, normally", "It restarts try block", "It enters finally in loop"], answerIndex: 1 },
      { question: "If catch(ArithmeticException) and catch(ArrayIndexOutOfBoundsException) are defined, and code throws NullPointerException:", options: ["It enters ArithmeticException", "NullPointerException bypasses both and propagates up", "It enters both catches", "It throws compilation error"], answerIndex: 1 },
      { question: "What is the syntax of Java 7 multi-catch?", options: ["catch (ArithmeticException && NullPointerException e)", "catch (ArithmeticException | NullPointerException e)", "catch (ArithmeticException, NullPointerException e)", "catch (ArithmeticException or NullPointerException e)"], answerIndex: 1 },
      { question: "Order catches from specific to generic because:", options: ["It makes code run faster", "JVM checks matches sequentially from top to bottom", "Compiler requires specific formatting", "Unchecked exceptions are ignored"], answerIndex: 1 }
    ]
  },
  "java-e6-3": {
    pretest: [
      { question: "In which package are standard built-in exceptions like NullPointerException located?", options: ["java.io", "java.lang", "java.util", "java.sql"], answerIndex: 1 },
      { question: "What triggers a NullPointerException?", options: ["Dividing by zero", "Referencing members or invoking methods of a null object reference", "Accessing invalid array index", "Parsing bad string format"], answerIndex: 1 },
      { question: "What triggers a NumberFormatException?", options: ["Converting text to graphics", "Attempting to parse an invalid string format into a number", "Arithmetic overflow", "Empty reference accesses"], answerIndex: 1 },
      { question: "Which exception is thrown when an array is accessed with an invalid index?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "ArithmeticException", "IndexOutOfBoundsException"], answerIndex: 1 },
      { question: "Checked exceptions are checked at:", options: ["Runtime", "Compile-time", "Linking time", "Loader startup"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Unchecked exceptions extend which class?", options: ["Exception", "RuntimeException", "Error", "Throwable"], answerIndex: 1 },
      { question: "What exception is thrown by Integer.parseInt(\"abc\")?", options: ["NullPointerException", "NumberFormatException", "ArithmeticException", "IOException"], answerIndex: 1 },
      { question: "What is StringIndexOutOfBoundsException a subclass of?", options: ["RuntimeException", "IndexOutOfBoundsException", "Exception", "Error"], answerIndex: 1 },
      { question: "Checked exceptions must be:", options: ["Ignored", "Caught in try-catch or declared using throws", "Converted to unchecked", "Defined as static"], answerIndex: 1 },
      { question: "Which of these is an unchecked exception?", options: ["IOException", "NullPointerException", "SQLException", "ClassNotFoundException"], answerIndex: 1 }
    ]
  },
  "java-e6-4": {
    pretest: [
      { question: "How do you create a custom checked exception in Java?", options: ["Extend java.lang.Error class", "Extend java.lang.Exception class", "Extend java.lang.RuntimeException class", "Extend java.lang.Thread class"], answerIndex: 1 },
      { question: "How do you trigger an exception manually in code?", options: ["Use the throws keyword", "Use the throw keyword", "Use try catch blocks", "Call exception.trigger()"], answerIndex: 1 },
      { question: "Which keyword is used in a method signature to declare exceptions it might throw?", options: ["throw", "throws", "try", "catch"], answerIndex: 1 },
      { question: "How do you create a custom unchecked exception?", options: ["Extend Exception class", "Extend RuntimeException class", "Extend Throwable class", "Extend Error class"], answerIndex: 1 },
      { question: "How does a custom exception constructor pass its error message to the parent?", options: ["this(message)", "super(message)", "parent(message)", "Exception(message)"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the difference between throw and throws?", options: ["No difference", "throw is used to manually raise an exception, throws declares exceptions in method signatures", "throws is used inside methods", "throw must have class return types"], answerIndex: 1 },
      { question: "Can a custom exception class contain additional fields and methods?", options: ["No, exceptions must be empty", "Yes, it is a standard Java class", "Only if it is static", "Only if it is unchecked"], answerIndex: 1 },
      { question: "If a method throws a checked custom exception:", options: ["The code crashes", "The caller must catch it or declare it in its own throws clause", "It will run unchecked", "It requires final keywords"], answerIndex: 1 },
      { question: "What does throw new CustomException(\"Error\") do?", options: ["Declares exception parameters", "Instantiates CustomException and raises it immediately", "Catches matching errors", "Checks compiler rules"], answerIndex: 1 },
      { question: "What is the signature of a custom exception constructor passing message?", options: ["public MyException()", "public MyException(String message) { super(message); }", "void MyException(String m)", "static MyException(String m)"], answerIndex: 1 }
    ]
  },
  "java-e7-1": {
    pretest: [
      { question: "What is a thread in Java?", options: ["A file pointer", "A lightweight subprocess, a path of execution", "A memory address", "A layout pane"], answerIndex: 1 },
      { question: "What are the two ways to create a thread?", options: ["Extend Thread class or implement Runnable interface", "Extend Process class or implement Runnable interface", "Extend Runnable class or implement Thread interface", "Use JVM static threads"], answerIndex: 0 },
      { question: "Which method is overridden to define thread execution body?", options: ["start()", "run()", "execute()", "main()"], answerIndex: 1 },
      { question: "Which method is invoked to start thread execution concurrently?", options: ["run()", "start()", "init()", "execute()"], answerIndex: 1 },
      { question: "What happens if you call run() directly instead of start() on a Thread?", options: ["It starts a new thread", "The run method executes in the caller thread sequentially, no new thread is started", "It causes compiler parse error", "It halts JVM"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which method suspends thread execution for a specified duration in milliseconds?", options: ["Thread.wait()", "Thread.sleep()", "Thread.suspend()", "Thread.stop()"], answerIndex: 1 },
      { question: "Thread.sleep() throws which checked exception?", options: ["NullPointerException", "InterruptedException", "IOException", "ThreadDeath"], answerIndex: 1 },
      { question: "Why is implementing Runnable preferred over extending Thread?", options: ["Allows running thread faster", "Leaves the subclass free to extend another class, promoting modularity", "Does not throw exceptions", "It is automatically static"], answerIndex: 1 },
      { question: "What thread executes the main method?", options: ["Daemon thread", "The main thread", "Garbage Collector thread", "UI Thread"], answerIndex: 1 },
      { question: "What is the state of a thread after start() is called but before scheduler runs it?", options: ["NEW", "RUNNABLE", "BLOCKED", "WAITING"], answerIndex: 1 }
    ]
  },
  "java-e7-2": {
    pretest: [
      { question: "What does the isAlive() method of the Thread class return?", options: ["Thread ID", "boolean indicating if thread has started and not terminated yet", "Thread name", "CPU usage percentage"], answerIndex: 1 },
      { question: "Which method blocks the current thread until the target thread terminates?", options: ["wait()", "join()", "sleep()", "yield()"], answerIndex: 1 },
      { question: "What exception can join() throw?", options: ["IOException", "InterruptedException", "SQLException", "IllegalThreadStateException"], answerIndex: 1 },
      { question: "If a thread has terminated, isAlive() returns:", options: ["true", "false", "NullPointerException", "0"], answerIndex: 1 },
      { question: "Calling join() is useful for:", options: ["Making threads run faster", "Coordinating sequence, waiting for worker thread output", "Creating background threads", "Locking variables"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Can you pass a timeout value to the join() method?", options: ["No, must wait forever", "Yes, to wait at most a specified number of milliseconds", "Only in JavaFX applications", "Only if it is daemon thread"], answerIndex: 1 },
      { question: "If join() is called on thread B from the main thread:", options: ["Thread B blocks until main completes", "Main thread blocks until B completes", "Both threads terminate", "It causes deadlock"], answerIndex: 1 },
      { question: "If thread B has already terminated and you call B.join():", options: ["It throws exception", "join returns immediately and doesn't block", "It blocks forever", "It restarts thread B"], answerIndex: 1 },
      { question: "Which state is a thread in while waiting inside join()?", options: ["RUNNABLE", "WAITING", "NEW", "BLOCKED"], answerIndex: 1 },
      { question: "What happens if you interrupt a thread waiting inside join()?", options: ["It continues waiting silently", "It throws InterruptedException", "It terminates JVM", "It returns default value"], answerIndex: 1 }
    ]
  },
  "java-e7-3": {
    pretest: [
      { question: "What is a daemon thread?", options: ["A high priority thread", "A background service provider thread", "A thread that cannot be stopped", "An interface specification"], answerIndex: 1 },
      { question: "Which method configures a thread as a daemon thread?", options: ["isDaemon()", "setDaemon(true)", "setDaemonThread()", "startDaemon()"], answerIndex: 1 },
      { question: "When must setDaemon(true) be called?", options: ["Anytime", "Before the thread is started with start()", "Inside run() method body", "After join() completes"], answerIndex: 1 },
      { question: "If you call setDaemon(true) after calling start():", options: ["It updates successfully", "IllegalThreadStateException is thrown", "The thread terminates", "It is ignored"], answerIndex: 1 },
      { question: "What happens to daemon threads when all user (non-daemon) threads complete?", options: ["They continue running", "JVM terminates them instantly and exits", "They turn into user threads", "They throw exceptions"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which is a standard example of a daemon thread in Java?", options: ["Main thread", "Garbage Collector", "JavaFX Application thread", "JDBC Thread"], answerIndex: 1 },
      { question: "How do you check if a thread is a daemon thread?", options: ["thread.getDaemon()", "thread.isDaemon()", "thread.status()", "thread.checkDaemon()"], answerIndex: 1 },
      { question: "If a JVM has only daemon threads running:", options: ["It blocks", "It terminates immediately", "It enters infinite loops", "It throws Errors"], answerIndex: 1 },
      { question: "Do daemon threads prevent JVM from exiting?", options: ["Yes, always", "No, only user threads prevent exit", "Only on Windows platforms", "Only if sleep is called"], answerIndex: 1 },
      { question: "Daemon threads are generally used for:", options: ["Main business logic", "Background tasks like metrics collection, cleanup, or services", "Fast mathematical computations", "Rendering UI stages"], answerIndex: 1 }
    ]
  },
  "java-e7-4": {
    pretest: [
      { question: "What is the Producer-Consumer problem?", options: ["A compiler error", "Classic multi-process synchronization problem over a shared buffer", "An inheritance issue", "A JDBC connectivity issue"], answerIndex: 1 },
      { question: "Which keyword is used to lock object monitors and achieve thread-safe access?", options: ["volatile", "synchronized", "transient", "locked"], answerIndex: 1 },
      { question: "Which class methods are used for inter-thread communication?", options: ["sleep(), join()", "wait(), notify(), and notifyAll()", "start(), run()", "suspend(), resume()"], answerIndex: 1 },
      { question: "In which block or method can wait() and notify() be called?", options: ["Any method", "Inside synchronized blocks or methods only", "Inside run() method only", "Only inside constructor blocks"], answerIndex: 1 },
      { question: "What happens if wait() is called outside a synchronized context?", options: ["It works fine", "IllegalMonitorStateException is thrown", "It blocks the thread", "It causes compiler error"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What does wait() do to the invoking thread?", options: ["Suspends it for 1s", "Releases the lock monitor and enters the WAITING state", "Restarts the thread", "Terminates execution"], answerIndex: 1 },
      { question: "What does notify() do?", options: ["Wakes all threads", "Wakes up a single thread waiting on the object's monitor lock", "Deletes locks", "Sends console logs"], answerIndex: 1 },
      { question: "Why should wait() be called inside a loop checking conditions?", options: ["To make code look clean", "To protect against spurious wakeups", "To increase priority", "To save memory"], answerIndex: 1 },
      { question: "What is the difference between notify() and notifyAll()?", options: ["No difference", "notify wakes one waiting thread; notifyAll wakes all waiting threads", "notify is static; notifyAll is instance", "notifyAll runs in background"], answerIndex: 1 },
      { question: "Synchronization resolves:", options: ["Syntax errors", "Resource race conditions and thread interference", "Linker references", "Null pointers"], answerIndex: 1 }
    ]
  },
  "java-e8-1": {
    pretest: [
      { question: "What is a package in Java?", options: ["A compressed zip archive", "A folder-like container grouping related classes and interfaces", "A compilation command", "A GUI stage Layout"], answerIndex: 1 },
      { question: "Which keyword is used to place a class inside a package?", options: ["import", "package", "class", "namespace"], answerIndex: 1 },
      { question: "Where must the package statement be located in a source file?", options: ["Anywhere", "At the very top of the file, before imports", "After import statements", "Inside the class declaration"], answerIndex: 1 },
      { question: "Which keyword is used to access classes in other packages?", options: ["extends", "import", "package", "use"], answerIndex: 1 },
      { question: "If a class member has no access modifier (default), it is visible:", options: ["Everywhere", "Only within its own package", "Only inside the class", "To subclasses only"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What folder structure matches package mypack.subpack?", options: ["mypack_subpack/", "mypack/subpack/", "subpack/mypack/", "mypack.subpack/"], answerIndex: 1 },
      { question: "To import all classes in a package, use:", options: ["import packagename.?", "import packagename.*", "import packagename.all", "import packagename.classes"], answerIndex: 1 },
      { question: "What is package-private access?", options: ["private visibility", "Default access, visible only within the package", "protected visibility", "public visibility"], answerIndex: 1 },
      { question: "Can package names contain uppercase letters?", options: ["No, forbidden", "Yes, but convention is all lowercase to avoid conflicts with class names", "Only for JavaFX packages", "Only if it matches main class name"], answerIndex: 1 },
      { question: "How do packages prevent naming collisions?", options: ["By encrypting filenames", "By establishing distinct namespaces", "By restricting compilations", "By clearing references"], answerIndex: 1 }
    ]
  },
  "java-e8-2": {
    pretest: [
      { question: "What is the window container in JavaFX?", options: ["Scene", "Stage", "Node", "VBox"], answerIndex: 1 },
      { question: "What object represents UI content inside a Stage?", options: ["Stage", "Scene", "Node", "ImageView"], answerIndex: 1 },
      { question: "What is the graphical hierarchy of nodes in a Scene called?", options: ["Tree Map", "Scene Graph", "Visual layout", "Stack Pane"], answerIndex: 1 },
      { question: "Which class represents static text displays in JavaFX?", options: ["TextField", "Label", "Button", "TextLayout"], answerIndex: 1 },
      { question: "Which node is used to display graphics or images?", options: ["Label", "ImageView", "Canvas", "SceneGraph"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which class must JavaFX main classes extend?", options: ["java.lang.Thread", "javafx.application.Application", "javafx.stage.Stage", "javafx.scene.Scene"], answerIndex: 1 },
      { question: "Which method is overridden to initialize the primary stage?", options: ["main()", "start(Stage primaryStage)", "init()", "show()"], answerIndex: 1 },
      { question: "What layout pane organizes child nodes vertically in a single column?", options: ["HBox", "VBox", "GridPane", "StackPane"], answerIndex: 1 },
      { question: "How do you display a Stage window?", options: ["stage.display()", "stage.show()", "stage.open()", "stage.setVisible(true)"], answerIndex: 1 },
      { question: "Every node in a Scene Graph has:", options: ["Multiple parent nodes", "Exactly one parent, except the root node", "No parent nodes", "At least one child node"], answerIndex: 1 }
    ]
  },
  "java-e8-3": {
    pretest: [
      { question: "GUI interactions wait for events in a model called:", options: ["Sequential programming", "Event-Driven Programming", "Concurrent loops", "Functional logic"], answerIndex: 1 },
      { question: "Which component allows text input in JavaFX?", options: ["Label", "TextField", "Slider", "Button"], answerIndex: 1 },
      { question: "Which component allows selecting values along a range?", options: ["TextField", "Slider", "ComboBox", "Label"], answerIndex: 1 },
      { question: "Which interface represents event listeners in JavaFX?", options: ["ActionListener", "EventHandler", "EventListener", "ActionHandler"], answerIndex: 1 },
      { question: "Which method registers action event listeners on a Button?", options: ["addListener()", "setOnAction()", "registerListener()", "click()"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Event listeners can be written compactly using:", options: ["Indentation", "Java 8 Lambda expressions", "Nested classes", "String builders"], answerIndex: 1 },
      { question: "What event parameter is passed to button action handlers?", options: ["EventObject", "ActionEvent", "MouseEvent", "WindowEvent"], answerIndex: 1 },
      { question: "How do you read text from a TextField?", options: ["textField.read()", "textField.getText()", "textField.value()", "textField.toString()"], answerIndex: 1 },
      { question: "How do you convert TextField input text into a double?", options: ["Double.valueOf(text)", "Double.parseDouble(text)", "(double)text", "Double.convert(text)"], answerIndex: 1 },
      { question: "Event handlers are executed on which thread?", options: ["Main Thread", "JavaFX Application Thread", "Background Worker Thread", "Compiler Thread"], answerIndex: 1 }
    ]
  },
  "java-e9-1": {
    pretest: [
      { question: "What does JDBC stand for?", options: ["Java Data Block Controller", "Java Database Connectivity", "Java Database Connection Class", "Joint Database Connector"], answerIndex: 1 },
      { question: "Which class is used to load drivers and open connection sessions?", options: ["Connection", "DriverManager", "Statement", "SQLClient"], answerIndex: 1 },
      { question: "Which interface represents an active database session?", options: ["DriverManager", "Connection", "Statement", "ResultSet"], answerIndex: 1 },
      { question: "Which exception must be caught when dealing with JDBC APIs?", options: ["IOException", "SQLException", "DatabaseException", "RuntimeException"], answerIndex: 1 },
      { question: "What is the standard driver class name for MySQL?", options: ["mysql.Driver", "com.mysql.cj.jdbc.Driver", "jdbc.mysql.Driver", "com.mysql.Driver"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which method establishes a connection using a URL, username, and password?", options: ["DriverManager.connect()", "DriverManager.getConnection()", "Connection.open()", "Class.forName()"], answerIndex: 1 },
      { question: "What is Class.forName() used for in JDBC?", options: ["To compile SQL queries", "To dynamically load and register the JDBC driver class", "To check connection states", "To import packages"], answerIndex: 1 },
      { question: "In JDBC URL jdbc:mysql://localhost:3306/db, 3306 is the:", options: ["IP address", "Database port number", "Driver version", "User count limit"], answerIndex: 1 },
      { question: "JDBC classes and interfaces are located in which package?", options: ["java.io", "java.sql", "java.util", "java.net"], answerIndex: 1 },
      { question: "Closing connection objects is important to:", options: ["Compile code faster", "Free database resource connections", "Format variables", "Reset passwords"], answerIndex: 1 }
    ]
  },
  "java-e9-2": {
    pretest: [
      { question: "Which interface is used to run static SQL statements in JDBC?", options: ["Connection", "Statement", "ResultSet", "PreparedStatement"], answerIndex: 1 },
      { question: "Which SQL command category includes INSERT?", options: ["DDL", "DML - Data Manipulation Language", "DCL", "TCL"], answerIndex: 1 },
      { question: "Which Statement method is executed for SQL INSERT statements?", options: ["executeQuery()", "executeUpdate()", "executeSelect()", "executeDML()"], answerIndex: 1 },
      { question: "What does executeUpdate() return for an INSERT query?", options: ["A boolean", "An integer representing the number of rows affected", "ResultSet", "null"], answerIndex: 1 },
      { question: "Which interface is pre-compiled and safer against SQL Injection?", options: ["Statement", "PreparedStatement", "ResultSet", "Connection"], answerIndex: 1 }
    ],
    posttest: [
      { question: "If executeUpdate() returns 0 for an INSERT query:", options: ["The database crashed", "No rows were inserted", "1 row was inserted", "It compiled with errors"], answerIndex: 1 },
      { question: "How do you execute an insert statement?", options: ["stmt.executeQuery(\"INSERT INTO...\")", "stmt.executeUpdate(\"INSERT INTO...\")", "stmt.executeInsert(\"INSERT INTO...\")", "stmt.run(\"INSERT INTO...\")"], answerIndex: 1 },
      { question: "How do you set query parameters in PreparedStatement?", options: ["Using raw strings", "Using setInt, setString, etc.", "Using placeholders %s", "Using indexes of array"], answerIndex: 1 },
      { question: "What exception is raised if an insert violates a primary key constraint?", options: ["NullPointerException", "SQLException", "ArithmeticException", "PrimaryConstraintError"], answerIndex: 1 },
      { question: "The executeUpdate() method is used for:", options: ["SELECT statements only", "INSERT, UPDATE, and DELETE statements", "Creating databases only", "Establishing connections"], answerIndex: 1 }
    ]
  },
  "java-e9-3": {
    pretest: [
      { question: "Which Statement method is executed for SQL DELETE statements?", options: ["executeQuery()", "executeUpdate()", "executeDelete()", "stmtDelete()"], answerIndex: 1 },
      { question: "What does executeUpdate() return for a DELETE query?", options: ["Always 0", "The number of rows matched and deleted", "ResultSet", "true"], answerIndex: 1 },
      { question: "If you run DELETE FROM student without a WHERE clause:", options: ["It throws exception", "All rows in the table are deleted", "No rows are deleted", "It deletes first row"], answerIndex: 1 },
      { question: "Which SQL statement is used to remove database rows?", options: ["REMOVE", "DELETE", "DROP", "TRUNCATE"], answerIndex: 1 },
      { question: "Statement objects are created using which method?", options: ["new Statement()", "connection.createStatement()", "DriverManager.createStatement()", "Class.createStatement()"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What happens if you run a DELETE statement where the WHERE clause matches no rows?", options: ["SQLException is thrown", "executeUpdate returns 0, no rows are deleted", "The program crashes", "It deletes all rows"], answerIndex: 1 },
      { question: "How do you close a Statement object?", options: ["statement.delete()", "statement.close()", "statement.exit()", "statement.disconnect()"], answerIndex: 1 },
      { question: "Can you execute a DELETE statement using a PreparedStatement?", options: ["No, only Statement", "Yes, using executeUpdate()", "Only if it is dynamic", "Only inside packages"], answerIndex: 1 },
      { question: "In JDBC, executing SQL statements can throw which checked exception?", options: ["IOException", "SQLException", "IllegalAccessException", "ClassCastException"], answerIndex: 1 },
      { question: "Which method executes queries that return tables of data (like SELECT)?", options: ["executeUpdate()", "executeQuery()", "executeDML()", "executeTable()"], answerIndex: 1 }
    ]
  }
};

function injectQuestionsLocally() {
  const javaDataPath = path.resolve('src/lib/java-data.ts');
  console.log("Reading java-data.ts...");
  let content = fs.readFileSync(javaDataPath, 'utf8');

  for (const [expId, questions] of Object.entries(questionBank)) {
    console.log(`Injecting local questions for ${expId}...`);
    
    // Find the index of the experiment
    const expIdIndex = content.indexOf(`id: "${expId}"`);
    if (expIdIndex === -1) {
      console.warn(`Warning: Experiment ${expId} not found in java-data.ts!`);
      continue;
    }
    
    // Find the next experiment index to bound our search
    let nextExpIndex = content.indexOf('id: "java-e', expIdIndex + 20);
    if (nextExpIndex === -1) {
      nextExpIndex = content.length;
    }
    
    // Search for pretest: [], within the bounds of this experiment block
    const block = content.substring(expIdIndex, nextExpIndex);
    const pretestRelativeIndex = block.indexOf('pretest: [],');
    if (pretestRelativeIndex === -1) {
      console.log(`Skipping pretest for ${expId} (already has questions or not found)`);
      continue;
    }
    const pretestIndex = expIdIndex + pretestRelativeIndex;
    
    // Format pretest questions
    const formattedPretest = 'pretest: [\n' + questions.pretest.map(q => 
      `              { question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`
    ).join(',\n') + '\n            ],';
    
    // Replace pretest: [],
    content = content.slice(0, pretestIndex) + formattedPretest + content.slice(pretestIndex + 'pretest: [],'.length);
    
    // Find posttest again in the newly updated content
    // Recompute bounds since content length changed
    const newExpIdIndex = content.indexOf(`id: "${expId}"`);
    let newNextExpIndex = content.indexOf('id: "java-e', newExpIdIndex + 20);
    if (newNextExpIndex === -1) {
      newNextExpIndex = content.length;
    }
    
    const newBlock = content.substring(newExpIdIndex, newNextExpIndex);
    const posttestRelativeIndex = newBlock.indexOf('posttest: [],');
    if (posttestRelativeIndex === -1) {
      console.warn(`Warning: posttest: [], not found for ${expId}`);
      continue;
    }
    const posttestIndex = newExpIdIndex + posttestRelativeIndex;
    
    const formattedPosttest = 'posttest: [\n' + questions.posttest.map(q => 
      `              { question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`
    ).join(',\n') + '\n            ],';
    
    content = content.slice(0, posttestIndex) + formattedPosttest + content.slice(posttestIndex + 'posttest: [],'.length);
  }

  fs.writeFileSync(javaDataPath, content, 'utf8');
  console.log("java-data.ts updated successfully with real Java questions for missing experiments.");
}

injectQuestionsLocally();
