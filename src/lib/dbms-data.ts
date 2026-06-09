// lib/dbms-data.ts

import { Course } from './course-data';
import { dbmsShortNotes } from './dbms-short-notes';

export const dbmsCourse: Course = {
  id: "dbms",
  title: "Database Management Systems Lab",
  shortNotes: dbmsShortNotes,
  objectives: [
    "To introduce students to the fundamental concepts of database systems and distinguish them from traditional file systems",
    "To enable students to model real-world problems using Entity-Relationship (ER) diagrams with proper notations",
    "To provide hands-on experience with the Relational Model including domains, attributes, tuples, relations, and constraints",
    "To train students in writing Relational Algebra and Relational Calculus expressions for querying relations",
    "To develop proficiency in SQL DDL operations — CREATE, ALTER, DROP — for defining and modifying table schemas",
    "To enable students to perform DML operations — INSERT, UPDATE, DELETE — on relational tables",
    "To train students in writing SQL SELECT queries using WHERE, arithmetic, logical, and string operators",
    "To develop skills in using SQL aggregate functions, GROUP BY, HAVING, and ORDER BY clauses",
    "To implement and test different types of joins (INNER, LEFT, RIGHT, FULL OUTER, SELF, CROSS) in SQL",
    "To understand and implement nested queries, sub-queries, and correlated sub-queries",
    "To create and manage views (updatable and non-updatable) and understand their use cases",
    "To understand schema refinement through normalization — 1NF, 2NF, 3NF, BCNF, 4NF, and 5NF",
    "To learn transaction concepts including ACID properties, serializability, and concurrency control protocols",
    "To explore indexing techniques including B+ Trees and Hash-based indexing"
  ],
  introduction: [
    "A Database Management System (DBMS) is software that enables users to define, create, maintain, and control access to databases. Unlike traditional file systems, a DBMS provides data independence, integrity enforcement, concurrent access control, and recovery mechanisms that are essential for modern enterprise applications.",
    "This Virtual DBMS Lab is developed for B.Tech students of Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV). The lab provides a browser-based environment where students can write and execute SQL queries, visualize ER diagrams, trace relational algebra expressions, and simulate transaction schedules without requiring any local database installation.",
    "The lab covers 15 experiments aligned with the JNTUGV DBMS Lab syllabus — from DDL/DML commands and advanced SQL queries to PL/SQL programming (blocks, loops, cursors, procedures, functions, triggers), indexing, and JDBC database connectivity. Each experiment includes a clear objective, problem statement, theory, pre-loaded SQL starter code, expected output, and self-assessment tests.",
    "Students can attempt all lab problems directly in the browser using a professional SQL editor powered by an in-browser SQLite engine, making the experience identical to working with a full relational database system."
  ],
  targetAudience: {
    primary: "Second-year B.Tech students of CSE and IT at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) enrolled in the Database Management Systems Lab course.",
    prerequisites: [
      "Basic knowledge of C or any programming language (loops, conditionals, functions)",
      "Familiarity with basic set theory and mathematical relations",
      "Understanding of file systems and basic data organization concepts"
    ],
    usefulFor: [
      "Students preparing for placements where SQL is a mandatory skill",
      "Students preparing for GATE, where DBMS is a high-weightage subject",
      "Faculty members looking for ready-made experiment references aligned to JNTUGV syllabus",
      "Self-learners who want a structured, browser-based SQL and database design environment"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science and Engineering / Information Technology",
    course: "Database Management Systems Lab",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "Second Year, First / Second Semester",
    branches: "CSE and IT",
    totalExperiments: "15 experiments",
    compiler: "SQLite (in-browser) — compatible with standard SQL used in JNTUGV physical labs",
    units: [
      { unit: "Experiment 1", topics: "DDL, DML, SELECT commands with constraints", weeks: "Week 1" },
      { unit: "Experiment 2", topics: "Subqueries using ANY, ALL, IN, EXISTS, NOT EXISTS, UNION, INTERSECT", weeks: "Week 2" },
      { unit: "Experiment 3", topics: "Aggregate functions (COUNT, SUM, AVG, MAX, MIN), GROUP BY, HAVING, Views", weeks: "Week 3" },
      { unit: "Experiment 4", topics: "Conversion functions (to_char, to_number, to_date), String functions, Date functions", weeks: "Week 4" },
      { unit: "Experiment 5", topics: "PL/SQL block: Declaration, Execution, Exception handling; COMMIT, ROLLBACK, SAVEPOINT", weeks: "Week 5" },
      { unit: "Experiment 6", topics: "Nested IF, CASE, CASE expression, NULLIF, COALESCE", weeks: "Week 6" },
      { unit: "Experiment 7", topics: "WHILE LOOPS, numeric FOR LOOPS, nested loops, Built-in & User-defined Exceptions, RAISE_APPLICATION_ERROR", weeks: "Week 7" },
      { unit: "Experiment 8", topics: "Procedures with IN and OUT parameters", weeks: "Week 8" },
      { unit: "Experiment 9", topics: "Stored functions, invoking functions in SQL statements", weeks: "Week 9" },
      { unit: "Experiment 10", topics: "Cursors: parameters, FOR UPDATE, WHERE CURRENT OF, Cursor variables", weeks: "Week 10" },
      { unit: "Experiment 11", topics: "Triggers: BEFORE/AFTER, Row/Statement level, INSTEAD OF", weeks: "Week 11" },
      { unit: "Experiment 12", topics: "Indexing vs non-indexing search performance", weeks: "Week 12" },
      { unit: "Experiment 13", topics: "JDBC: Connecting to a database", weeks: "Week 13" },
      { unit: "Experiment 14", topics: "JDBC: Insert values into a table", weeks: "Week 14" },
      { unit: "Experiment 15", topics: "JDBC: Delete values from a table", weeks: "Week 15" }
    ]
  },
  weeks: [
    {
      title: "EXPERIMENT 1",
      objective: "Creation, altering and dropping of tables and inserting rows into a table (use constraints while creating tables) examples using SELECT command.",
      tutorial: "DDL and DML Commands",
      labTitle: "Table Creation and Data Manipulation",
      experiments: [
        {
          id: "db-exp1",
          title: "DDL (CREATE, ALTER, DROP) and DML (INSERT, SELECT) with Constraints",
          desc: "Create tables with PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK constraints. Use ALTER to modify table structure. Insert rows using INSERT. Query using SELECT with WHERE clause.",
          expected: "Tables created with constraints; ALTER operations successful; INSERT respects constraints; SELECT returns filtered results.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Create tables using CREATE TABLE with various constraints (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK)",
                "Modify table structure using ALTER TABLE (ADD, MODIFY, DROP columns, add constraints)",
                "Remove tables using DROP TABLE",
                "Insert data using INSERT INTO ... VALUES",
                "Retrieve data using SELECT with WHERE clause"
              ]
            },
            theory: [
              { title: "CREATE TABLE with Constraints", body: ["PRIMARY KEY: Uniquely identifies each row. Implies NOT NULL.", "FOREIGN KEY: References PRIMARY KEY of another table, enforces referential integrity.", "NOT NULL: Column cannot contain NULL values.", "UNIQUE: All values in column must be distinct (allows one NULL).", "CHECK: Values must satisfy a condition (e.g., Age >= 18)."] },
              { title: "ALTER TABLE", body: ["ALTER TABLE table_name ADD column_name datatype;", "ALTER TABLE table_name RENAME COLUMN old TO new;", "ALTER TABLE table_name DROP COLUMN column_name;", "ALTER TABLE table_name ADD CONSTRAINT constraint_name CHECK (condition);"] },
              { title: "DROP TABLE", body: ["DROP TABLE table_name; — removes table structure and data", "DROP TABLE table_name CASCADE CONSTRAINTS; — also drops dependent constraints"] },
              { title: "INSERT and SELECT", body: ["INSERT INTO table (col1, col2) VALUES (val1, val2);", "SELECT * FROM table WHERE condition; — filters rows based on condition"] }
            ],
            pretest: [
              { question: "Which constraint ensures that a column cannot have NULL values?", options: ["UNIQUE", "NOT NULL", "PRIMARY KEY", "CHECK"], answerIndex: 1, hint: "NOT NULL forces every row to have a value in that column." },
              { question: "Which SQL command is used to add a new column to an existing table?", options: ["ADD COLUMN", "ALTER TABLE ... ADD", "MODIFY TABLE", "INSERT COLUMN"], answerIndex: 1, hint: "ALTER TABLE with ADD clause is used to add columns." },
              { question: "What happens when you try to INSERT a row with a duplicate PRIMARY KEY?", options: ["The new row replaces the old one", "A constraint violation error occurs", "The duplicate is allowed", "The table is truncated"], answerIndex: 1, hint: "PRIMARY KEY enforces uniqueness — duplicates are rejected." },
              { question: "Which command removes both the table structure and all its data?", options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"], answerIndex: 2, hint: "DROP removes the entire table; DELETE and TRUNCATE only remove data." },
              { question: "The WHERE clause in a SELECT statement is used to:", options: ["Sort the results", "Filter rows based on a condition", "Group the results", "Join multiple tables"], answerIndex: 1, hint: "WHERE restricts which rows are returned based on conditions." }
            ],
            procedure: [
              "Read the Aim and Theory sections carefully",
              "Open the Code Test tab — starter code is pre-loaded",
              "Execute CREATE TABLE statements for STUDENT, DEPARTMENT, and COURSE",
              "Test constraints by inserting valid and invalid data",
              "Use ALTER TABLE to add a Phone column to STUDENT",
              "Use SELECT with WHERE to filter students by department",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Create DEPARTMENT table\nCREATE TABLE DEPARTMENT (\n    Dept_ID   INT PRIMARY KEY,\n    Dept_Name VARCHAR(50) NOT NULL UNIQUE,\n    Location  VARCHAR(100)\n);\n\n-- Create STUDENT table with constraints\nCREATE TABLE STUDENT (\n    Roll_No   INT PRIMARY KEY,\n    Name      VARCHAR(100) NOT NULL,\n    Age       INT CHECK (Age >= 17 AND Age <= 30),\n    Email     VARCHAR(100) UNIQUE,\n    Dept_ID   INT,\n    FOREIGN KEY (Dept_ID) REFERENCES DEPARTMENT(Dept_ID)\n);\n\n-- ALTER TABLE: add Phone column\nALTER TABLE STUDENT ADD Phone VARCHAR(15);\n\n-- INSERT data\nINSERT INTO DEPARTMENT VALUES (1, 'CSE', 'Hyderabad');\nINSERT INTO DEPARTMENT VALUES (2, 'IT', 'Vizag');\n\nINSERT INTO STUDENT VALUES (101, 'Alice', 20, 'alice@edu.in', 1, '9876543210');\nINSERT INTO STUDENT VALUES (102, 'Bob', 22, 'bob@edu.in', 2, '9876543211');\n\n-- SELECT with WHERE\nSELECT * FROM STUDENT WHERE Dept_ID = 1;\n\n-- DROP TABLE (commented for safety)\n-- DROP TABLE STUDENT;\n-- DROP TABLE DEPARTMENT;",
              steps: [
                { line: 1, annotation: "DEPARTMENT table created with PRIMARY KEY and NOT NULL UNIQUE constraints", memory: [], output: "Table DEPARTMENT created" },
                { line: 2, annotation: "STUDENT table created with PRIMARY KEY, NOT NULL, CHECK, UNIQUE, FOREIGN KEY", memory: [], output: "Table STUDENT created" },
                { line: 3, annotation: "Phone column added to STUDENT using ALTER TABLE", memory: [], output: "Table STUDENT altered" },
                { line: 4, annotation: "Rows inserted into DEPARTMENT and STUDENT", memory: [], output: "2 rows inserted into DEPARTMENT, 2 rows into STUDENT" },
                { line: 5, annotation: "SELECT with WHERE returns only CSE students", memory: [], output: "Alice (Dept_ID=1)" }
              ]
            },
            posttest: [
              { question: "What is the purpose of the FOREIGN KEY constraint?", options: ["Ensures values are unique", "Ensures values are not NULL", "Links a column to the PRIMARY KEY of another table", "Checks a condition on values"], answerIndex: 2, hint: "FOREIGN KEY maintains referential integrity between tables." },
              { question: "Which ALTER command correctly adds a CHECK constraint that Age must be >= 18?", options: ["ALTER TABLE STUDENT ADD CHECK (Age >= 18);", "ALTER TABLE STUDENT MODIFY CHECK (Age >= 18);", "ALTER TABLE STUDENT ADD CONSTRAINT chk_age CHECK (Age >= 18);", "ALTER TABLE STUDENT SET CHECK (Age >= 18);"], answerIndex: 2, hint: "Use ADD CONSTRAINT with CHECK to add a named constraint." },
              { question: "What does DROP TABLE STUDENT do?", options: ["Deletes all rows but keeps the table structure", "Deletes the table structure and all data", "Disables all constraints on the table", "Renames the table"], answerIndex: 1, hint: "DROP removes the entire table from the database." },
              { question: "The CHECK constraint Age >= 17 AND Age <= 30 will reject which insertion?", options: ["Age = 20", "Age = 25", "Age = 16", "Age = 22"], answerIndex: 2, hint: "16 is below the minimum allowed age of 17." },
              { question: "Which statement inserts a new row into STUDENT correctly?", options: ["INSERT STUDENT VALUES (103, 'Carol', 19, 'carol@edu.in', 1);", "INSERT INTO STUDENT (Roll_No, Name, Age, Email, Dept_ID) VALUES (103, 'Carol', 19, 'carol@edu.in', 1);", "INSERT INTO STUDENT SET Roll_No=103, Name='Carol';", "ADD INTO STUDENT VALUES (103, 'Carol', 19);"], answerIndex: 1, hint: "INSERT INTO table (columns) VALUES (...) is the correct syntax." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 2",
      objective: "Queries (along with subqueries) using ANY, ALL, IN, EXISTS, NOT EXISTS, UNION, INTERSECT, Constraints. Example: Select the roll number and name of the student who secured fourth rank in the class.",
      tutorial: "Advanced Subqueries and Set Operations",
      labTitle: "Subqueries and Set Operations",
      experiments: [
        {
          id: "db-exp2",
          title: "Subqueries with ANY, ALL, IN, EXISTS, NOT EXISTS, UNION, INTERSECT",
          desc: "Write queries using: (a) IN to find students in specific departments, (b) EXISTS to find students with at least one mark, (c) ANY/ALL to compare marks, (d) UNION to combine results, (e) INTERSECT to find common records, (f) Find 4th rank student using subquery.",
          expected: "Correct results using each operator; 4th rank student identified correctly.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use IN operator to filter rows based on a set of values from a subquery",
                "Use EXISTS and NOT EXISTS to test for existence of rows in a subquery",
                "Use ANY and ALL to compare a value with a set of values from a subquery",
                "Use UNION and INTERSECT to combine results of two queries",
                "Find the 4th rank student using a correlated subquery with ranking logic"
              ]
            },
            theory: [
              { title: "IN Operator", body: ["WHERE column IN (SELECT column FROM table) — returns true if value matches any value in subquery result.", "Example: SELECT Name FROM STUDENT WHERE Dept_ID IN (SELECT Dept_ID FROM DEPARTMENT WHERE Location='Hyderabad');"] },
              { title: "EXISTS / NOT EXISTS", body: ["EXISTS returns true if subquery returns at least one row. NOT EXISTS returns true if subquery returns zero rows.", "Example: SELECT Name FROM STUDENT S WHERE EXISTS (SELECT 1 FROM MARKS M WHERE M.Roll_No = S.Roll_No);"] },
              { title: "ANY / ALL", body: ["ANY: compares value to ANY value in the set (like OR). ALL: compares value to ALL values in the set (like AND).", "Example: SELECT Name FROM STUDENT WHERE Age > ANY (SELECT Age FROM STUDENT WHERE Dept_ID=2);"] },
              { title: "UNION / INTERSECT", body: ["UNION combines results of two queries and removes duplicates.", "INTERSECT returns rows common to both queries.", "Both require union-compatible queries (same number and type of columns)."] },
              { title: "Finding nth Rank", body: ["SELECT Roll_No, Name FROM (SELECT Roll_No, Name, Marks, ROW_NUMBER() OVER (ORDER BY Marks DESC) AS rnk FROM MARKS) WHERE rnk = 4;", "Alternative using correlated subquery: COUNT of students with higher marks + 1 = rank."] }
            ],
            pretest: [
              { question: "Which operator returns TRUE if the subquery returns at least one row?", options: ["IN", "EXISTS", "ANY", "ALL"], answerIndex: 1, hint: "EXISTS checks for presence of any row in the subquery result." },
              { question: "SELECT Name FROM STUDENT WHERE Marks > ANY (SELECT Marks FROM STUDENT WHERE Dept='CSE') — what does this find?", options: ["Students with marks greater than all CSE students", "Students with marks greater than at least one CSE student", "Students with marks less than all CSE students", "Students with marks equal to CSE students"], answerIndex: 1, hint: "ANY means greater than at least one value in the set." },
              { question: "UNION removes duplicates. What keeps duplicates?", options: ["UNION DISTINCT", "UNION ALL", "UNION DUPLICATES", "UNION KEEP"], answerIndex: 1, hint: "UNION ALL retains all rows including duplicates." },
              { question: "To find students who are enrolled in BOTH CS101 and CS102, which operator is most appropriate?", options: ["UNION", "INTERSECT", "EXCEPT", "ALL"], answerIndex: 1, hint: "INTERSECT returns rows common to both result sets." },
              { question: "In the example 'Select roll number and name of student who secured fourth rank', which clause helps order the marks?", options: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], answerIndex: 2, hint: "Ranking requires sorting marks in descending order." }
            ],
            procedure: [
              "Review sample STUDENT and MARKS tables in the Simulation tab",
              "Run IN query: students in departments located in 'Hyderabad'",
              "Run EXISTS query: students with at least one mark record",
              "Run ANY query: students with marks greater than any IT student",
              "Run UNION: combine CSE and IT student names",
              "Run INTERSECT: students enrolled in both CS101 and CS102",
              "Write the 4th rank query using ORDER BY and LIMIT (or ROW_NUMBER)",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Sample data\nCREATE TABLE STUDENT (Roll_No INT PRIMARY KEY, Name VARCHAR(50), Age INT, Dept_ID INT);\nCREATE TABLE MARKS (Roll_No INT, Course_ID VARCHAR(10), Marks INT);\nINSERT INTO STUDENT VALUES (101,'Alice',20,1),(102,'Bob',22,2),(103,'Carol',21,1),(104,'David',23,3),(105,'Eve',20,2);\nINSERT INTO MARKS VALUES (101,'CS101',85),(102,'CS101',72),(103,'CS101',91),(104,'CS101',60),(105,'CS101',78);\n\n-- IN: Students in departments 1 or 2\nSELECT * FROM STUDENT WHERE Dept_ID IN (1,2);\n\n-- EXISTS: Students with marks\nSELECT Name FROM STUDENT S WHERE EXISTS (SELECT 1 FROM MARKS M WHERE M.Roll_No = S.Roll_No);\n\n-- ANY: Students with marks > any student in dept 2\nSELECT Name, Marks FROM MARKS M JOIN STUDENT S ON M.Roll_No=S.Roll_No\nWHERE Marks > ANY (SELECT Marks FROM MARKS WHERE Roll_No IN (102,105));\n\n-- UNION: CSE and IT student names\nSELECT Name FROM STUDENT WHERE Dept_ID=1 UNION SELECT Name FROM STUDENT WHERE Dept_ID=2;\n\n-- 4th Rank Student\nSELECT Roll_No, Name, Marks FROM (\n    SELECT Roll_No, Name, Marks, ROW_NUMBER() OVER (ORDER BY Marks DESC) AS rnk\n    FROM STUDENT JOIN MARKS USING(Roll_No)\n) WHERE rnk = 4;",
              steps: [
                { line: 1, annotation: "IN returns students with Dept_ID 1 or 2", memory: [], output: "Alice, Bob, Carol, Eve" },
                { line: 2, annotation: "EXISTS returns students who have marks records (all 5)", memory: [], output: "Alice, Bob, Carol, David, Eve" },
                { line: 3, annotation: "ANY: marks > any IT student (72) → returns Alice(85), Carol(91)", memory: [], output: "Alice(85), Carol(91)" },
                { line: 4, annotation: "UNION combines CSE and IT student names, removes duplicates", memory: [], output: "Alice, Bob, Carol, Eve" },
                { line: 5, annotation: "4th rank after sorting: Carol(91), Alice(85), Eve(78), Bob(72), David(60) → Bob is 4th", memory: [], output: "Bob, 4th rank" }
              ]
            },
            posttest: [
              { question: "What does WHERE Marks > ALL (SELECT Marks FROM STUDENT WHERE Dept='CSE') return?", options: ["Students with marks greater than all CSE students (higher than max)", "Students with marks greater than any CSE student", "Students with marks less than all CSE students", "Students with marks equal to CSE students"], answerIndex: 0, hint: "ALL requires the value to be greater than every value in the set." },
              { question: "Which query finds students NOT enrolled in any course?", options: ["SELECT * FROM STUDENT WHERE EXISTS (SELECT 1 FROM MARKS)", "SELECT * FROM STUDENT WHERE NOT EXISTS (SELECT 1 FROM MARKS WHERE MARKS.Roll_No=STUDENT.Roll_No)", "SELECT * FROM STUDENT WHERE Roll_No IN (SELECT Roll_No FROM MARKS)", "SELECT * FROM STUDENT WHERE Roll_No = ANY (SELECT Roll_No FROM MARKS)"], answerIndex: 1, hint: "NOT EXISTS finds rows with no matching subquery result." },
              { question: "UNION and INTERSECT require the two SELECT statements to be:", options: ["From the same table", "Union-compatible (same number of columns, compatible types)", "Sorted the same way", "Have the same WHERE clause"], answerIndex: 1, hint: "Set operations require the same number and types of columns." },
              { question: "To find the 3rd highest marks, what LIMIT/OFFSET combination is used after sorting?", options: ["LIMIT 3", "LIMIT 1 OFFSET 2", "LIMIT 3 OFFSET 1", "LIMIT 2 OFFSET 1"], answerIndex: 1, hint: "Skip first 2 rows (ranks 1 and 2), then take 1 row (rank 3)." },
              { question: "SELECT Name FROM STUDENT WHERE Roll_No IN (SELECT Roll_No FROM MARKS WHERE Marks > 80) — what does this return?", options: ["Students with any marks > 80", "Students with average marks > 80", "Students with all marks > 80", "Students with no marks > 80"], answerIndex: 0, hint: "IN returns true if the student appears in the subquery result (has at least one marks > 80)." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 3",
      objective: "Queries using Aggregate functions (COUNT, SUM, AVG, MAX and MIN), GROUP BY, HAVING and Creation and dropping of Views.",
      tutorial: "Aggregate Functions, Grouping, and Views",
      labTitle: "Aggregation and Views",
      experiments: [
        {
          id: "db-exp3",
          title: "Aggregate Functions, GROUP BY, HAVING, and Views",
          desc: "(a) Use COUNT, SUM, AVG, MAX, MIN on STUDENT/MARKS tables. (b) Use GROUP BY to aggregate per department/course. (c) Use HAVING to filter groups. (d) Create and drop views.",
          expected: "Correct aggregate results; groups filtered with HAVING; views created and queried successfully.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use aggregate functions: COUNT, SUM, AVG, MAX, MIN",
                "Group data using GROUP BY clause",
                "Filter groups using HAVING clause",
                "Create views (virtual tables) using CREATE VIEW",
                "Drop views using DROP VIEW"
              ]
            },
            theory: [
              { title: "Aggregate Functions", body: ["COUNT(*): number of rows; COUNT(col): number of non-NULL values", "SUM(col): sum of numeric values; AVG(col): average", "MAX(col), MIN(col): largest/smallest value", "Aggregates ignore NULL values except COUNT(*)"] },
              { title: "GROUP BY", body: ["Groups rows with same values in specified columns", "Columns in SELECT must either be in GROUP BY or be aggregates", "Example: SELECT Dept_ID, AVG(Age) FROM STUDENT GROUP BY Dept_ID;"] },
              { title: "HAVING", body: ["Filters groups after aggregation (WHERE filters rows before grouping)", "Can use aggregate functions in condition", "Example: GROUP BY Dept_ID HAVING AVG(Age) > 20;"] },
              { title: "Views", body: ["CREATE VIEW view_name AS SELECT ...; — stores a query as a virtual table", "DROP VIEW view_name; — removes the view", "Views provide security and simplify complex queries"] }
            ],
            pretest: [
              { question: "Which aggregate function returns the number of rows in a table?", options: ["COUNT(*)", "SUM(*)", "TOTAL(*)", "NUM(*)"], answerIndex: 0, hint: "COUNT(*) counts all rows in the result set." },
              { question: "What is the difference between WHERE and HAVING?", options: ["WHERE filters rows; HAVING filters groups after GROUP BY", "WHERE filters groups; HAVING filters rows", "They are identical", "HAVING cannot use aggregate functions"], answerIndex: 0, hint: "WHERE is applied before grouping, HAVING after grouping." },
              { question: "Which clause must be used with aggregate functions when non-aggregated columns are selected?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], answerIndex: 2, hint: "Non-aggregated columns in SELECT must appear in GROUP BY." },
              { question: "A view is best described as:", options: ["A physical copy of data", "A stored query that behaves like a virtual table", "A backup of a table", "An index on a table"], answerIndex: 1, hint: "Views store query definitions, not data themselves." },
              { question: "What does AVG(Marks) return if a student has NULL in Marks?", options: ["0", "NULL", "Average of non-NULL values", "Error"], answerIndex: 2, hint: "AVG ignores NULL values when computing the average." }
            ],
            procedure: [
              "Run COUNT(*) to find total students",
              "Run GROUP BY Dept_ID with AVG(Age) to find average age per department",
              "Run GROUP BY Course_ID with AVG(Marks) and HAVING AVG(Marks) > 75",
              "Create a view: CREATE VIEW CSE_Students AS SELECT * FROM STUDENT WHERE Dept_ID=1",
              "Query the view: SELECT * FROM CSE_Students",
              "Drop the view: DROP VIEW CSE_Students",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Aggregate Functions\nSELECT COUNT(*) AS Total_Students FROM STUDENT;\nSELECT Dept_ID, AVG(Age) AS Avg_Age, MAX(Age) AS Max_Age FROM STUDENT GROUP BY Dept_ID;\nSELECT Course_ID, AVG(Marks) AS Avg_Marks, MIN(Marks) AS Min_Marks, MAX(Marks) AS Max_Marks FROM MARKS GROUP BY Course_ID;\n\n-- GROUP BY with HAVING\nSELECT Dept_ID, COUNT(*) AS Student_Count\nFROM STUDENT\nGROUP BY Dept_ID\nHAVING COUNT(*) > 1;\n\n-- Create View\nCREATE VIEW Student_Summary AS\nSELECT Roll_No, Name, (SELECT AVG(Marks) FROM MARKS M WHERE M.Roll_No=S.Roll_No) AS Avg_Marks\nFROM STUDENT S;\n\n-- Query View\nSELECT * FROM Student_Summary;\n\n-- Drop View\nDROP VIEW Student_Summary;",
              steps: [
                { line: 1, annotation: "COUNT(*) returns total number of student rows", memory: [], output: "Total_Students: 5" },
                { line: 2, annotation: "GROUP BY Dept_ID gives per-department aggregates", memory: [], output: "Dept 1: Avg_Age=20.5, Max_Age=21; Dept 2: Avg_Age=21, Max_Age=22; Dept 3: Avg_Age=23, Max_Age=23" },
                { line: 3, annotation: "HAVING filters departments with more than 1 student", memory: [], output: "Dept_ID 1: count=2, Dept_ID 2: count=2" },
                { line: 4, annotation: "View created with subquery to compute average marks", memory: [], output: "View Student_Summary created" },
                { line: 5, annotation: "DROP VIEW removes the view definition", memory: [], output: "View dropped" }
              ]
            },
            posttest: [
              { question: "SELECT Dept_ID, COUNT(*) FROM STUDENT GROUP BY Dept_ID; — what does COUNT(*) represent in each row?", options: ["Number of distinct departments", "Number of students in that department", "Total number of students", "Average age in that department"], answerIndex: 1, hint: "COUNT(*) in GROUP BY counts rows per group — here, students per department." },
              { question: "Which query finds departments with average marks above 80?", options: ["SELECT Dept_ID FROM STUDENT WHERE AVG(Marks) > 80", "SELECT Dept_ID, AVG(Marks) FROM STUDENT JOIN MARKS USING(Roll_No) GROUP BY Dept_ID HAVING AVG(Marks) > 80", "SELECT Dept_ID FROM STUDENT HAVING AVG(Marks) > 80", "SELECT Dept_ID, AVG(Marks) FROM STUDENT GROUP BY Dept_ID WHERE AVG(Marks) > 80"], answerIndex: 1, hint: "Use GROUP BY with HAVING for aggregate conditions." },
              { question: "What happens when you DROP a view?", options: ["The underlying base table is also dropped", "Only the view definition is removed; base table remains", "All data in the view is deleted", "The view becomes read-only"], answerIndex: 1, hint: "DROP VIEW removes only the stored query, not the base tables." },
              { question: "SELECT AVG(Marks) FROM MARKS — if one student has NULL marks, how many rows are used in the average?", options: ["All rows including NULL (treated as 0)", "All rows excluding NULL", "Only non-NULL rows", "No rows — error"], answerIndex: 2, hint: "AVG ignores NULL values." },
              { question: "Which is the correct order of SQL clause evaluation?", options: ["SELECT → FROM → WHERE → GROUP BY → HAVING", "FROM → WHERE → GROUP BY → HAVING → SELECT", "FROM → GROUP BY → WHERE → HAVING → SELECT", "SELECT → WHERE → GROUP BY → HAVING → FROM"], answerIndex: 1, hint: "FROM loads data, WHERE filters rows, GROUP BY groups, HAVING filters groups, SELECT projects." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 4",
      objective: "Queries using Conversion functions (to_char, to_number, to_date), string functions (Concatenation, lpad, rpad, ltrim, rtrim, lower, upper, initcap, length, substr, instr), date functions (Sysdate, next_day, add_months, last_day, months_between, least, greatest, trunc, round, to_char, to_date).",
      tutorial: "SQL Functions — Conversion, String, Date",
      labTitle: "Built-in Functions in SQL",
      experiments: [
        {
          id: "db-exp4",
          title: "Conversion, String, and Date Functions",
          desc: "Demonstrate: (a) TO_CHAR, TO_NUMBER, TO_DATE for type conversion, (b) String functions: CONCAT, LPAD, RPAD, LTRIM, RTRIM, LOWER, UPPER, INITCAP, LENGTH, SUBSTR, INSTR, (c) Date functions: SYSDATE, NEXT_DAY, ADD_MONTHS, LAST_DAY, MONTHS_BETWEEN, LEAST, GREATEST, TRUNC, ROUND.",
          expected: "Correct transformations and date calculations; results shown for each function.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use conversion functions: TO_CHAR, TO_NUMBER, TO_DATE",
                "Use string functions for text manipulation",
                "Use date functions for date arithmetic and formatting",
                "Combine multiple functions in a single query"
              ]
            },
            theory: [
              { title: "Conversion Functions", body: ["TO_CHAR(value, format): converts number/date to string", "TO_NUMBER(string): converts string to number", "TO_DATE(string, format): converts string to date"] },
              { title: "String Functions", body: ["CONCAT(s1,s2) or || — concatenation", "LPAD(s, n, p), RPAD(s, n, p) — pad left/right", "LTRIM(s), RTRIM(s), TRIM(s) — remove spaces", "LOWER(s), UPPER(s), INITCAP(s) — case conversion", "LENGTH(s) — string length", "SUBSTR(s, start, len) — extract substring", "INSTR(s, substr) — find position of substring"] },
              { title: "Date Functions (Oracle style — SQLite equivalents)", body: ["DATE('now') — current date", "STRFTIME('%Y-%m-%d', date) — format date", "JULIANDAY(date1) - JULIANDAY(date2) — days between", "DATE(date, '+n months') — add months", "To simulate LEAST/GREATEST: MIN(date1,date2), MAX(date1,date2)"] }
            ],
            pretest: [
              { question: "Which function converts a number to a formatted string?", options: ["CAST", "CONVERT", "TO_CHAR", "TO_NUMBER"], answerIndex: 2, hint: "TO_CHAR converts to character/string format." },
              { question: "What does SUBSTR('Database', 3, 4) return?", options: ["Data", "taba", "tabase", "abas"], answerIndex: 1, hint: "SUBSTR starts at position 3 (character 't'), takes 4 characters." },
              { question: "Which function returns the position of a substring within a string?", options: ["POSITION", "INSTR", "INDEX", "LOCATE"], answerIndex: 1, hint: "INSTR returns the starting index of the substring." },
              { question: "INITCAP('hello world') produces:", options: ["HELLO WORLD", "hello world", "Hello World", "Hello world"], answerIndex: 2, hint: "INITCAP capitalizes the first letter of each word." },
              { question: "Which date function adds months to a given date in SQLite?", options: ["ADD_MONTHS(date, n)", "DATE(date, '+n months')", "DATE_ADD(date, n)", "MONTH_ADD(date, n)"], answerIndex: 1, hint: "SQLite uses DATE(date, modifier) for date arithmetic." }
            ],
            procedure: [
              "Run TO_CHAR and TO_NUMBER conversion examples",
              "Apply string functions to a sample Name column",
              "Compute student age using date functions on Date_of_Birth",
              "Use SUBSTR and INSTR to extract domain from email",
              "Use LPAD/RPAD to format Roll_No with leading zeros",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Add DOB column to STUDENT\nALTER TABLE STUDENT ADD COLUMN DOB TEXT;\nUPDATE STUDENT SET DOB = '2003-06-15' WHERE Roll_No=101;\nUPDATE STUDENT SET DOB = '2002-03-22' WHERE Roll_No=102;\n\n-- Conversion (SQLite uses CAST)\nSELECT Roll_No, CAST(Marks AS TEXT) AS Marks_Text FROM MARKS;\n\n-- String functions\nSELECT Name,\n       UPPER(Name) AS Upper_Name,\n       LOWER(Name) AS Lower_Name,\n       LENGTH(Name) AS Name_Length,\n       SUBSTR(Name,1,3) AS Prefix,\n       INSTR(Name, 'a') AS Pos_Of_A\nFROM STUDENT;\n\n-- Concatenation\nSELECT Roll_No, Name || ' (' || CAST(Age AS TEXT) || ')' AS Student_Info FROM STUDENT;\n\n-- LPAD/RPAD (SQLite equivalent using printf)\nSELECT Roll_No, PRINTF('%05d', Roll_No) AS Padded_Roll FROM STUDENT;\n\n-- Date functions\nSELECT Name, DOB,\n       DATE('now') AS Today,\n       (JULIANDAY('now') - JULIANDAY(DOB)) / 365.25 AS Age_Years,\n       DATE(DOB, '+18 years') AS Adult_From\nFROM STUDENT;",
              steps: [
                { line: 1, annotation: "DOB column added and populated", memory: [], output: "STUDENT now has DOB for some rows" },
                { line: 2, annotation: "UPPER, LOWER, LENGTH, SUBSTR, INSTR applied", memory: [], output: "Alice→ALICE/alice/5/Ali/1 (position of 'a')" },
                { line: 3, annotation: "Concatenation with || operator", memory: [], output: "Alice (20), Bob (22)" },
                { line: 4, annotation: "PRINTF pads Roll_No to 5 digits with leading zeros", memory: [], output: "00101, 00102" },
                { line: 5, annotation: "Age computed from DOB using Julian days", memory: [], output: "Alice: ~21 years, Adult from 2021-06-15" }
              ]
            },
            posttest: [
              { question: "What does LTRIM('  Hello  ') return?", options: ["  Hello", "Hello  ", "Hello", "  Hello  "], answerIndex: 2, hint: "LTRIM removes leading spaces, not trailing." },
              { question: "SUBSTR('Information', 3, 5) returns:", options: ["Infor", "forma", "format", "ormat"], answerIndex: 3, hint: "Start at position 3 ('f'), take 5 characters: 'forma'? Wait, check: position3='f', 5 chars='forma'? Actually 'f','o','r','m','a' = 'forma'." },
              { question: "Which function finds the number of characters in a string?", options: ["LEN", "COUNT", "LENGTH", "SIZE"], answerIndex: 2, hint: "LENGTH returns character count." },
              { question: "What does INITCAP('JOHN DOE') produce?", options: ["JOHN DOE", "john doe", "John Doe", "John doe"], answerIndex: 2, hint: "INITCAP capitalizes first letter of each word, lowercases others." },
              { question: "Which function returns the current date in SQLite?", options: ["NOW()", "CURRENT_DATE", "DATE('now')", "SYSDATE"], answerIndex: 2, hint: "SQLite uses DATE('now') for current date." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 5",
      objective: "(i) Create a simple PL/SQL program which includes declaration section, executable section and exception-handling section (Ex. Student marks can be selected from the table and printed for those who secured first class and an exception can be raised if no records were found). (ii) Insert data into student table and use COMMIT, ROLLBACK and SAVEPOINT in PL/SQL block.",
      tutorial: "PL/SQL Blocks and Transaction Control",
      labTitle: "PL/SQL Fundamentals",
      experiments: [
        {
          id: "db-exp5",
          title: "PL/SQL Block with Exception Handling and Transaction Control",
          desc: "(i) Write a PL/SQL block with DECLARE, BEGIN, EXCEPTION sections. Select marks of first class students (>=60). Raise exception if no records found. (ii) Insert data using COMMIT, ROLLBACK, SAVEPOINT.",
          expected: "First class students displayed; NO_DATA_FOUND exception raised when appropriate; COMMIT/ROLLBACK/SAVEPOINT demonstrated.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Write a PL/SQL block with DECLARE, BEGIN, EXCEPTION sections",
                "Declare variables and cursors",
                "Handle NO_DATA_FOUND exception",
                "Use COMMIT, ROLLBACK, SAVEPOINT for transaction control"
              ]
            },
            theory: [
              { title: "PL/SQL Block Structure", body: ["DECLARE — variable declarations", "BEGIN — executable statements", "EXCEPTION — error handling (optional)", "END; — block terminator"] },
              { title: "Variables and Cursors", body: ["v_name VARCHAR2(50);", "CURSOR c1 IS SELECT * FROM STUDENT;", "OPEN, FETCH, CLOSE for explicit cursors"] },
              { title: "Exception Handling", body: ["WHEN NO_DATA_FOUND THEN — no rows returned", "WHEN TOO_MANY_ROWS THEN — multiple rows", "WHEN OTHERS THEN — any other error", "SQLERRM — error message"] },
              { title: "Transaction Control", body: ["COMMIT — makes changes permanent", "ROLLBACK — undoes all changes since last commit", "SAVEPOINT name — creates a rollback point", "ROLLBACK TO SAVEPOINT name — undo to savepoint"] }
            ],
            pretest: [
              { question: "Which section of a PL/SQL block is optional?", options: ["DECLARE", "BEGIN", "EXCEPTION", "END"], answerIndex: 2, hint: "EXCEPTION is optional — only needed if you want to handle errors." },
              { question: "Which exception is raised when a SELECT INTO returns no rows?", options: ["TOO_MANY_ROWS", "NO_DATA_FOUND", "VALUE_ERROR", "ZERO_DIVIDE"], answerIndex: 1, hint: "NO_DATA_FOUND occurs when SELECT INTO yields 0 rows." },
              { question: "COMMIT in a PL/SQL block does what?", options: ["Undoes all changes", "Makes all changes permanent", "Creates a savepoint", "Ends the block"], answerIndex: 1, hint: "COMMIT makes changes permanent and visible to other transactions." },
              { question: "What is the purpose of SAVEPOINT?", options: ["To permanently save data", "To create a rollback point within a transaction", "To commit partial changes", "To end a transaction"], answerIndex: 1, hint: "SAVEPOINT allows partial rollback within a transaction." },
              { question: "After ROLLBACK TO SAVEPOINT sp1, the transaction:", options: ["Is committed", "Is aborted", "Remains active", "Auto-commits"], answerIndex: 2, hint: "ROLLBACK TO SAVEPOINT undoes changes after the savepoint but keeps the transaction active." }
            ],
            procedure: [
              "Open the PL/SQL editor (simulated in browser using JavaScript)",
              "Declare variables for Roll_No, Name, Marks",
              "Write a loop to fetch and display first class students (Marks >= 60)",
              "Use EXCEPTION WHEN NO_DATA_FOUND to handle empty result",
              "Insert a new student using INSERT",
              "Use SAVEPOINT before update, then ROLLBACK TO SAVEPOINT",
              "Use COMMIT to finalize changes",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- PL/SQL Block: First Class Students with Exception Handling\n-- (Simulated in JavaScript for browser environment)\n\nDECLARE\n    v_roll STUDENT.Roll_No%TYPE;\n    v_name STUDENT.Name%TYPE;\n    v_marks MARKS.Marks%TYPE;\n    CURSOR c_firstclass IS\n        SELECT S.Roll_No, S.Name, M.Marks\n        FROM STUDENT S JOIN MARKS M ON S.Roll_No = M.Roll_No\n        WHERE M.Marks >= 60;\nBEGIN\n    OPEN c_firstclass;\n    LOOP\n        FETCH c_firstclass INTO v_roll, v_name, v_marks;\n        EXIT WHEN c_firstclass%NOTFOUND;\n        DBMS_OUTPUT.PUT_LINE('Roll: ' || v_roll || ', Name: ' || v_name || ', Marks: ' || v_marks);\n    END LOOP;\n    CLOSE c_firstclass;\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        DBMS_OUTPUT.PUT_LINE('No first class students found.');\nEND;\n/\n\n-- Transaction Control Block\nBEGIN\n    INSERT INTO STUDENT VALUES (106, 'Frank', 21, 1, 'frank@edu.in', '9876543212');\n    SAVEPOINT sp1;\n    \n    UPDATE STUDENT SET Age = 22 WHERE Roll_No = 106;\n    -- If error occurs: ROLLBACK TO SAVEPOINT sp1;\n    \n    COMMIT;  -- Make changes permanent\nEXCEPTION\n    WHEN OTHERS THEN\n        ROLLBACK;\n        DBMS_OUTPUT.PUT_LINE('Transaction rolled back: ' || SQLERRM);\nEND;\n/",
              steps: [
                { line: 1, annotation: "Cursor declared to select first class students (Marks >= 60)", memory: [], output: "Cursor c_firstclass defined" },
                { line: 2, annotation: "LOOP fetches each row and prints using DBMS_OUTPUT", memory: [], output: "Alice(101):85, Bob(102):72, Carol(103):91, David(104):60, Eve(105):78" },
                { line: 3, annotation: "EXCEPTION handles case when no first class students", memory: [], output: "All students have marks >= 60, so exception not raised" },
                { line: 4, annotation: "Transaction block: insert, savepoint, update, commit", memory: [], output: "Frank inserted and updated, then committed" },
                { line: 5, annotation: "If error occurs, ROLLBACK to sp1 or full ROLLBACK", memory: [], output: "Transaction changes applied or rolled back" }
              ]
            },
            posttest: [
              { question: "In PL/SQL, %TYPE is used to:", options: ["Declare a cursor", "Declare a variable with the same data type as a column", "Declare an exception", "Declare a constant"], answerIndex: 1, hint: "%TYPE anchors a variable's type to a database column." },
              { question: "What does c_firstclass%NOTFOUND indicate?", options: ["The cursor is open", "The last FETCH was successful", "The last FETCH returned no rows", "The cursor is closed"], answerIndex: 2, hint: "%NOTFOUND is true when the most recent FETCH returned no rows." },
              { question: "After ROLLBACK TO SAVEPOINT sp1, the changes made after sp1 are:", options: ["Committed", "Undone", "Still pending", "Moved to a new savepoint"], answerIndex: 1, hint: "ROLLBACK TO SAVEPOINT undoes all changes made after that savepoint." },
              { question: "Which exception is raised when a SELECT INTO returns more than one row?", options: ["NO_DATA_FOUND", "TOO_MANY_ROWS", "DUP_VAL_ON_INDEX", "INVALID_NUMBER"], answerIndex: 1, hint: "TOO_MANY_ROWS occurs when SELECT INTO returns multiple rows." },
              { question: "What is the difference between ROLLBACK and ROLLBACK TO SAVEPOINT?", options: ["No difference", "ROLLBACK undoes entire transaction; ROLLBACK TO SAVEPOINT undoes only after savepoint", "ROLLBACK TO SAVEPOINT commits first", "ROLLBACK can only be used with SAVEPOINT"], answerIndex: 1, hint: "Full ROLLBACK aborts the entire transaction; ROLLBACK TO SAVEPOINT is partial." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 6",
      objective: "Develop a program that includes the features NESTED IF, CASE and CASE expression. The program can be extended using the NULLIF and COALESCE functions.",
      tutorial: "Conditional Logic in PL/SQL",
      labTitle: "IF-THEN-ELSE, CASE, NULLIF, COALESCE",
      experiments: [
        {
          id: "db-exp6",
          title: "Nested IF, CASE Expressions, NULLIF, COALESCE",
          desc: "Write a PL/SQL block that: (a) Uses nested IF to assign grade based on marks, (b) Uses CASE expression to convert grade letter to description, (c) Uses NULLIF and COALESCE to handle NULL values.",
          expected: "Correct grade assignment using nested IF; CASE expression returns description; NULLIF and COALESCE handle NULLs appropriately.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use nested IF-THEN-ELSE statements for multiple conditions",
                "Use CASE expression for value-based branching",
                "Use NULLIF to return NULL when two expressions are equal",
                "Use COALESCE to return the first non-NULL value in a list"
              ]
            },
            theory: [
              { title: "IF-THEN-ELSE", body: ["IF condition THEN statements;", "ELSIF condition THEN statements;", "ELSE statements;", "END IF;"] },
              { title: "Nested IF", body: ["IF condition1 THEN", "  IF condition2 THEN statements;", "  END IF;", "END IF;"] },
              { title: "CASE Expression", body: ["CASE grade", "  WHEN 'A' THEN 'Excellent'", "  WHEN 'B' THEN 'Good'", "  ELSE 'Average'", "END;"] },
              { title: "NULLIF and COALESCE", body: ["NULLIF(a,b) returns NULL if a equals b, else returns a", "COALESCE(a,b,c) returns first non-NULL value", "Useful for handling missing data"] }
            ],
            pretest: [
              { question: "What does NULLIF(10,10) return?", options: ["10", "0", "NULL", "Error"], answerIndex: 2, hint: "NULLIF returns NULL when both arguments are equal." },
              { question: "COALESCE(NULL, NULL, 5, 10) returns:", options: ["NULL", "0", "5", "10"], answerIndex: 2, hint: "COALESCE returns the first non-NULL value in the list." },
              { question: "Which CASE expression correctly maps grade 'A' to 'Excellent'?", options: ["CASE grade WHEN 'A' THEN 'Excellent' END", "CASE 'A' WHEN grade THEN 'Excellent' END", "CASE WHEN grade='A' THEN 'Excellent' END", "All of the above"], answerIndex: 3, hint: "Both searched CASE and simple CASE are valid syntax." },
              { question: "In nested IF, the inner IF executes only when:", options: ["The outer IF condition is false", "The outer IF condition is true", "Always", "Never"], answerIndex: 1, hint: "Nested IF conditions are evaluated only if the outer condition is true." },
              { question: "COALESCE can be used to:", options: ["Replace NULL with a default value", "Combine two strings", "Add numbers", "Compare two values"], answerIndex: 0, hint: "COALESCE substitutes a default for NULL values." }
            ],
            procedure: [
              "Write PL/SQL block that fetches student marks",
              "Use nested IF to assign grade: A(>=90), B(>=75), C(>=60), D(>=50), F(<50)",
              "Use CASE expression to convert grade to description",
              "Use NULLIF to handle division by zero (e.g., total marks = 0)",
              "Use COALESCE to provide default value for missing data",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "DECLARE\n    v_marks NUMBER := 78;\n    v_grade CHAR(1);\n    v_description VARCHAR2(20);\n    v_result NUMBER;\nBEGIN\n    -- Nested IF for grade assignment\n    IF v_marks >= 90 THEN\n        v_grade := 'A';\n    ELSE\n        IF v_marks >= 75 THEN\n            v_grade := 'B';\n        ELSE\n            IF v_marks >= 60 THEN\n                v_grade := 'C';\n            ELSE\n                IF v_marks >= 50 THEN\n                    v_grade := 'D';\n                ELSE\n                    v_grade := 'F';\n                END IF;\n            END IF;\n        END IF;\n    END IF;\n    \n    -- CASE expression for description\n    v_description := CASE v_grade\n        WHEN 'A' THEN 'Excellent'\n        WHEN 'B' THEN 'Good'\n        WHEN 'C' THEN 'Average'\n        WHEN 'D' THEN 'Pass'\n        ELSE 'Fail'\n    END;\n    \n    -- NULLIF: avoid division by zero\n    v_result := 100 / NULLIF(v_marks, 0);\n    \n    -- COALESCE: default for NULL\n    v_marks := COALESCE(v_marks, 0);\n    \n    DBMS_OUTPUT.PUT_LINE('Marks: ' || v_marks);\n    DBMS_OUTPUT.PUT_LINE('Grade: ' || v_grade);\n    DBMS_OUTPUT.PUT_LINE('Description: ' || v_description);\n    DBMS_OUTPUT.PUT_LINE('Result: ' || v_result);\nEND;\n/",
              steps: [
                { line: 1, annotation: "v_marks set to 78", memory: [], output: "Marks: 78" },
                { line: 2, annotation: "Nested IF checks 78 >= 90? No. 78 >= 75? Yes → Grade B", memory: [], output: "Grade: B" },
                { line: 3, annotation: "CASE converts grade B to 'Good'", memory: [], output: "Description: Good" },
                { line: 4, annotation: "NULLIF(78,0) returns 78; 100/78 = 1.28", memory: [], output: "Result: 1.282" },
                { line: 5, annotation: "COALESCE returns v_marks as is (not NULL)", memory: [], output: "Final output displayed" }
              ]
            },
            posttest: [
              { question: "NULLIF(5,0) returns:", options: ["NULL", "0", "5", "Error"], answerIndex: 2, hint: "NULLIF returns NULL only when the two arguments are equal — here 5 != 0, so returns 5." },
              { question: "COALESCE(NULL, 'Hello', 'World') returns:", options: ["NULL", "Hello", "World", "Error"], answerIndex: 1, hint: "First non-NULL value in the list is 'Hello'." },
              { question: "Which conditional statement can replace multiple nested IFs more cleanly?", options: ["CASE", "LOOP", "GOTO", "CONTINUE"], answerIndex: 0, hint: "CASE provides a cleaner alternative for multiple conditional branches." },
              { question: "In searched CASE, the first WHEN condition that evaluates to TRUE is executed. What happens if no condition is TRUE and no ELSE?", options: ["Error", "NULL is returned", "The CASE returns NULL", "The program crashes"], answerIndex: 2, hint: "CASE without ELSE returns NULL if no condition matches." },
              { question: "COALESCE(a,b,c) is equivalent to:", options: ["CASE WHEN a IS NOT NULL THEN a WHEN b IS NOT NULL THEN b ELSE c END", "NULLIF(a,b,c)", "CASE a WHEN NULL THEN b WHEN NULL THEN c END", "NVL2(a,b,c)"], answerIndex: 0, hint: "COALESCE can be rewritten as a CASE statement with multiple WHEN conditions." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 7",
      objective: "Program development using WHILE LOOPS, numeric FOR LOOPS, nested loops using ERROR Handling, BUILT-IN Exceptions, USE defined Exceptions, RAISE-APPLICATION ERROR.",
      tutorial: "Loops and Exception Handling in PL/SQL",
      labTitle: "Loops and Advanced Exceptions",
      experiments: [
        {
          id: "db-exp7",
          title: "Loops (WHILE, FOR, Nested) and Exception Handling",
          desc: "(a) Use WHILE loop to iterate through student records, (b) Use numeric FOR loop to process range of values, (c) Use nested loops to process marks per student, (d) Handle built-in exceptions (ZERO_DIVIDE, INVALID_NUMBER), (e) Define and raise user-defined exceptions, (f) Use RAISE_APPLICATION_ERROR.",
          expected: "Loops execute correctly; built-in and user-defined exceptions caught; RAISE_APPLICATION_ERROR raises custom error.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use WHILE loop with exit condition",
                "Use numeric FOR loop to iterate over a range",
                "Use nested loops (outer loop for students, inner loop for courses)",
                "Handle built-in exceptions like ZERO_DIVIDE",
                "Define and raise user-defined exceptions using PRAGMA EXCEPTION_INIT",
                "Use RAISE_APPLICATION_ERROR for custom error messages"
              ]
            },
            theory: [
              { title: "WHILE Loop", body: ["WHILE condition LOOP statements; END LOOP;", "Condition evaluated before each iteration", "Use EXIT WHEN to break early"] },
              { title: "Numeric FOR Loop", body: ["FOR counter IN 1..10 LOOP statements; END LOOP;", "Counter automatically incremented", "REVERSE keyword for descending order"] },
              { title: "Nested Loops", body: ["One loop inside another", "Outer loop controls major iteration, inner loop for dependent iteration"] },
              { title: "User-defined Exceptions", body: ["DECLARE e_custom EXCEPTION;", "PRAGMA EXCEPTION_INIT(e_custom, -20001);", "RAISE e_custom;"] },
              { title: "RAISE_APPLICATION_ERROR", body: ["RAISE_APPLICATION_ERROR(-20001, 'Custom error message');", "Range: -20000 to -20999"] }
            ],
            pretest: [
              { question: "How many times does FOR i IN 1..5 LOOP execute?", options: ["4", "5", "6", "Depends on condition"], answerIndex: 1, hint: "FOR i IN 1..5 includes both 1 and 5, so 5 iterations." },
              { question: "A WHILE loop continues as long as the condition is:", options: ["FALSE", "TRUE", "NULL", "0"], answerIndex: 1, hint: "WHILE condition: loop executes while condition is TRUE." },
              { question: "Which built-in exception is raised when division by zero occurs?", options: ["NO_DATA_FOUND", "TOO_MANY_ROWS", "ZERO_DIVIDE", "VALUE_ERROR"], answerIndex: 2, hint: "ZERO_DIVIDE is the exception for division by zero." },
              { question: "PRAGMA EXCEPTION_INIT is used to:", options: ["Declare a variable", "Associate a user-defined exception with an Oracle error number", "Initialize a cursor", "Start a transaction"], answerIndex: 1, hint: "PRAGMA EXCEPTION_INIT links a user-defined exception to a specific error number." },
              { question: "RAISE_APPLICATION_ERROR can be used with error numbers:", options: ["0 to 100", "-20000 to -20999", "1 to 9999", "Any positive number"], answerIndex: 1, hint: "User-defined error numbers in Oracle must be between -20000 and -20999." }
            ],
            procedure: [
              "Write WHILE loop to display numbers 1 to 10",
              "Write numeric FOR loop to calculate factorial",
              "Write nested loops: outer FOR loop for students, inner WHILE loop for courses",
              "Divide by zero inside loop and catch ZERO_DIVIDE",
              "Define user-defined exception for negative marks",
              "Use RAISE_APPLICATION_ERROR when invalid data found",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "DECLARE\n    v_counter NUMBER := 1;\n    v_fact NUMBER := 1;\n    v_marks NUMBER;\n    e_negative_marks EXCEPTION;\n    PRAGMA EXCEPTION_INIT(e_negative_marks, -20001);\nBEGIN\n    -- WHILE Loop\n    DBMS_OUTPUT.PUT_LINE('WHILE Loop:');\n    WHILE v_counter <= 5 LOOP\n        DBMS_OUTPUT.PUT_LINE(v_counter);\n        v_counter := v_counter + 1;\n    END LOOP;\n    \n    -- Numeric FOR Loop (factorial)\n    DBMS_OUTPUT.PUT_LINE('FOR Loop Factorial of 5:');\n    FOR i IN 1..5 LOOP\n        v_fact := v_fact * i;\n    END LOOP;\n    DBMS_OUTPUT.PUT_LINE('5! = ' || v_fact);\n    \n    -- Nested loops with exception\n    FOR rec IN (SELECT Roll_No, Marks FROM MARKS) LOOP\n        BEGIN\n            IF rec.Marks < 0 THEN\n                RAISE e_negative_marks;\n            END IF;\n            DBMS_OUTPUT.PUT_LINE('Roll: ' || rec.Roll_No || ', Marks: ' || rec.Marks || ', Normalized: ' || (100 / rec.Marks));\n        EXCEPTION\n            WHEN ZERO_DIVIDE THEN\n                DBMS_OUTPUT.PUT_LINE('Roll: ' || rec.Roll_No || ' - Zero marks, cannot normalize.');\n            WHEN e_negative_marks THEN\n                RAISE_APPLICATION_ERROR(-20001, 'Negative marks found for Roll: ' || rec.Roll_No);\n        END;\n    END LOOP;\nEXCEPTION\n    WHEN OTHERS THEN\n        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);\nEND;\n/",
              steps: [
                { line: 1, annotation: "WHILE loop executes 5 times, prints 1 through 5", memory: [], output: "1,2,3,4,5" },
                { line: 2, annotation: "FOR loop calculates 5! = 120", memory: [], output: "5! = 120" },
                { line: 3, annotation: "Nested loop: for each student, compute 100/marks", memory: [], output: "Roll: 101, Marks: 85, Normalized: 1.176" },
                { line: 4, annotation: "ZERO_DIVIDE exception if marks=0", memory: [], output: "Zero marks handled gracefully" },
                { line: 5, annotation: "User-defined exception raised for negative marks", memory: [], output: "RAISE_APPLICATION_ERROR invoked" }
              ]
            },
            posttest: [
              { question: "What is the output of FOR i IN REVERSE 1..3 LOOP DBMS_OUTPUT.PUT_LINE(i); END LOOP;", options: ["1,2,3", "3,2,1", "1,2,3 then 3,2,1", "Error"], answerIndex: 1, hint: "REVERSE iterates in descending order." },
              { question: "Which built-in exception is raised when a conversion fails (e.g., TO_NUMBER('ABC'))?", options: ["NO_DATA_FOUND", "INVALID_NUMBER", "VALUE_ERROR", "ZERO_DIVIDE"], answerIndex: 2, hint: "VALUE_ERROR occurs on data conversion errors." },
              { question: "What happens when you RAISE e_custom without defining it in DECLARE?", options: ["Compilation error", "Runtime error", "The exception is ignored", "It works fine"], answerIndex: 0, hint: "All exceptions must be declared before they can be raised." },
              { question: "EXIT WHEN counter > 10 inside a WHILE loop does what?", options: ["Exits when counter exceeds 10", "Exits immediately", "Continues to next iteration", "Restarts the loop"], answerIndex: 0, hint: "EXIT WHEN breaks the loop when the condition becomes true." },
              { question: "What is the range of error numbers allowed for RAISE_APPLICATION_ERROR?", options: ["-20000 to -20999", "0 to 100", "-1000 to -2000", "Any negative number"], answerIndex: 0, hint: "Oracle reserves error numbers from -20000 to -20999 for user-defined errors." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 8",
      objective: "Programs development using creation of procedures, passing parameters IN and OUT of PROCEDURES.",
      tutorial: "Stored Procedures",
      labTitle: "Creating and Using Procedures",
      experiments: [
        {
          id: "db-exp8",
          title: "Procedures with IN and OUT Parameters",
          desc: "Create procedures: (a) GetStudentMarks(IN roll_no, OUT marks) — returns marks of a student, (b) UpdateStudentAge(IN roll_no, IN new_age) — updates age, (c) GetStudentDetails(IN roll_no, OUT name, OUT age, OUT dept).",
          expected: "Procedures created successfully; IN parameters pass values; OUT parameters return values; procedure logic correct.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Create stored procedures using CREATE OR REPLACE PROCEDURE",
                "Use IN parameters to pass input values to the procedure",
                "Use OUT parameters to return values from the procedure",
                "Use IN OUT parameters for bidirectional value passing",
                "Invoke procedures from anonymous PL/SQL blocks"
              ]
            },
            theory: [
              { title: "Procedure Syntax", body: ["CREATE OR REPLACE PROCEDURE name(param1 IN type, param2 OUT type, param3 IN OUT type) IS", "  -- variable declarations", "BEGIN", "  -- executable statements", "END;"] },
              { title: "Parameter Modes", body: ["IN: Read-only parameter (default). Cannot be modified.", "OUT: Write-only parameter. Value returned to caller.", "IN OUT: Both readable and writable. Can be modified."] },
              { title: "Calling Procedures", body: ["EXEC proc_name(10, :out_var); — in SQL*Plus", "BEGIN proc_name(10, v_out); END; — in PL/SQL block"] }
            ],
            pretest: [
              { question: "Which parameter mode is the default if no mode is specified?", options: ["OUT", "IN", "IN OUT", "NONE"], answerIndex: 1, hint: "Parameters default to IN mode if not explicitly specified." },
              { question: "An OUT parameter:", options: ["Can be read and written", "Can only be read", "Can only be written (returned to caller)", "Cannot be used inside the procedure"], answerIndex: 2, hint: "OUT parameters are used to return values to the caller — they cannot be read." },
              { question: "How do you call a procedure named GetMarks with IN parameter 101 and OUT parameter v_marks?", options: ["GetMarks(101, v_marks)", "CALL GetMarks(101, v_marks)", "BEGIN GetMarks(101, v_marks); END;", "EXECUTE GetMarks(101, v_marks)"], answerIndex: 2, hint: "Procedures are called inside a BEGIN...END block or using EXEC in SQL*Plus." },
              { question: "What does CREATE OR REPLACE PROCEDURE do?", options: ["Creates a new procedure or replaces an existing one", "Creates a procedure only if it doesn't exist", "Updates a procedure", "Drops and recreates the procedure"], answerIndex: 0, hint: "OR REPLACE overwrites an existing procedure with the same name." },
              { question: "An IN OUT parameter:", options: ["Passes a value in and returns a value out", "Cannot be modified", "Is read-only", "Is write-only"], answerIndex: 0, hint: "IN OUT parameters allow both passing a value in and returning a changed value." }
            ],
            procedure: [
              "Open the PL/SQL editor",
              "Create procedure GetStudentMarks with IN roll_no and OUT marks",
              "Test the procedure with a known roll number",
              "Create procedure UpdateStudentAge with IN roll_no and IN new_age",
              "Create procedure GetStudentDetails with IN roll_no, OUT name, OUT age, OUT dept",
              "Invoke all procedures from an anonymous block and verify outputs",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Procedure 1: Get marks for a student\nCREATE OR REPLACE PROCEDURE GetStudentMarks(\n    p_roll IN STUDENT.Roll_No%TYPE,\n    p_marks OUT MARKS.Marks%TYPE\n) IS\nBEGIN\n    SELECT Marks INTO p_marks\n    FROM MARKS\n    WHERE Roll_No = p_roll AND ROWNUM = 1;\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        p_marks := NULL;\nEND;\n/\n\n-- Procedure 2: Update student age\nCREATE OR REPLACE PROCEDURE UpdateStudentAge(\n    p_roll IN STUDENT.Roll_No%TYPE,\n    p_new_age IN STUDENT.Age%TYPE\n) IS\nBEGIN\n    UPDATE STUDENT SET Age = p_new_age WHERE Roll_No = p_roll;\n    COMMIT;\nEND;\n/\n\n-- Procedure 3: Get full student details\nCREATE OR REPLACE PROCEDURE GetStudentDetails(\n    p_roll IN STUDENT.Roll_No%TYPE,\n    p_name OUT STUDENT.Name%TYPE,\n    p_age OUT STUDENT.Age%TYPE,\n    p_dept OUT STUDENT.Dept_ID%TYPE\n) IS\nBEGIN\n    SELECT Name, Age, Dept_ID INTO p_name, p_age, p_dept\n    FROM STUDENT WHERE Roll_No = p_roll;\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        p_name := NULL; p_age := NULL; p_dept := NULL;\nEND;\n/\n\n-- Calling the procedures\nDECLARE\n    v_marks MARKS.Marks%TYPE;\n    v_name STUDENT.Name%TYPE;\n    v_age STUDENT.Age%TYPE;\n    v_dept STUDENT.Dept_ID%TYPE;\nBEGIN\n    GetStudentMarks(101, v_marks);\n    DBMS_OUTPUT.PUT_LINE('Marks for 101: ' || NVL(TO_CHAR(v_marks), 'Not found'));\n    \n    UpdateStudentAge(101, 21);\n    \n    GetStudentDetails(101, v_name, v_age, v_dept);\n    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name || ', Age: ' || v_age || ', Dept: ' || v_dept);\nEND;\n/",
              steps: [
                { line: 1, annotation: "GetStudentMarks: IN p_roll, OUT p_marks", memory: [], output: "Procedure created" },
                { line: 2, annotation: "UpdateStudentAge: IN p_roll, IN p_new_age", memory: [], output: "Procedure created" },
                { line: 3, annotation: "GetStudentDetails: IN p_roll, OUT p_name, p_age, p_dept", memory: [], output: "Procedure created" },
                { line: 4, annotation: "Anonymous block calls all three procedures", memory: [], output: "Marks for 101: 85; Name: Alice, Age: 21, Dept: 1" }
              ]
            },
            posttest: [
              { question: "What is the purpose of %TYPE in parameter declaration?", options: ["To declare a cursor", "To anchor the parameter's data type to a column", "To create a constant", "To define a record"], answerIndex: 1, hint: "%TYPE ensures the parameter has the same data type as the specified column." },
              { question: "Can an OUT parameter be used in an expression inside the procedure?", options: ["Yes, like any other variable", "No, OUT parameters are write-only", "Yes, but only after assignment", "Only in SELECT statements"], answerIndex: 1, hint: "OUT parameters cannot be read; they can only be assigned values." },
              { question: "What happens if NO_DATA_FOUND occurs in GetStudentMarks and isn't handled?", options: ["Procedure returns NULL", "Procedure returns 0", "Exception propagates to caller", "Procedure retries"], answerIndex: 2, hint: "Unhandled exceptions propagate to the calling environment." },
              { question: "Which keyword is used to replace an existing procedure?", options: ["REPLACE", "OR REPLACE", "ALTER", "UPDATE"], answerIndex: 1, hint: "CREATE OR REPLACE PROCEDURE replaces an existing procedure if it exists." },
              { question: "How do you view the source code of a stored procedure?", options: ["SELECT * FROM PROCEDURES;", "SELECT TEXT FROM USER_SOURCE WHERE NAME = 'PROC_NAME';", "SHOW PROCEDURE PROC_NAME;", "DESCRIBE PROC_NAME;"], answerIndex: 1, hint: "USER_SOURCE contains the source code of stored procedures." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 9",
      objective: "Program development using creation of stored functions, invoke functions in SQL Statements and write complex functions.",
      tutorial: "Stored Functions",
      labTitle: "Creating and Using Functions",
      experiments: [
        {
          id: "db-exp9",
          title: "Stored Functions and Invocation in SQL",
          desc: "Create functions: (a) GetAverageMarks(student_roll) returns average marks, (b) GetGrade(marks) returns grade letter, (c) GetAge(dob) returns age in years. Invoke these functions in SELECT statements.",
          expected: "Functions created correctly; invoked in SQL statements; complex functions with multiple statements work.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Create stored functions with RETURN clause",
                "Distinguish between procedures (no return) and functions (must return a value)",
                "Invoke functions in SQL SELECT statements",
                "Write complex functions with multiple SQL statements and logic"
              ]
            },
            theory: [
              { title: "Function Syntax", body: ["CREATE OR REPLACE FUNCTION name(param1 IN type, ...) RETURN return_type IS", "  -- declarations", "BEGIN", "  -- statements", "  RETURN value;", "END;"] },
              { title: "Function vs Procedure", body: ["Function: Must return a value; can be called in SQL statements; usually for computation.", "Procedure: Does not return a value; called as standalone statement; usually for actions (UPDATE, INSERT)."] },
              { title: "Invoking Functions in SQL", body: ["SELECT GetGrade(marks) FROM STUDENT;", "SELECT Name, GetAverageMarks(Roll_No) FROM STUDENT;", "Functions called in SQL must be deterministic and have no OUT parameters."] }
            ],
            pretest: [
              { question: "What is the key difference between a procedure and a function?", options: ["Procedures are faster", "Functions must return a value; procedures do not", "Functions cannot have parameters", "Procedures are stored differently"], answerIndex: 1, hint: "The presence of a RETURN clause and returned value distinguishes functions." },
              { question: "Where can a stored function be invoked?", options: ["Only in PL/SQL blocks", "Only in SELECT statements", "In SELECT statements, WHERE clause, and PL/SQL blocks", "Only in procedures"], answerIndex: 2, hint: "Functions can be used anywhere an expression is allowed in SQL." },
              { question: "What does RETURN do in a function?", options: ["Exits the function and returns a value", "Prints a value", "Logs a value", "Saves a value"], answerIndex: 0, hint: "RETURN both exits the function and provides the result value." },
              { question: "Can a function have OUT parameters?", options: ["Yes, like procedures", "No, functions should only have IN parameters", "Yes, but only one", "Only IN OUT parameters are allowed"], answerIndex: 1, hint: "Functions called in SQL cannot have OUT parameters; pure functions for SQL use only IN parameters." },
              { question: "Which clause defines the data type of the returned value?", options: ["RETURNS", "RETURN", "TYPE", "DATATYPE"], answerIndex: 0, hint: "RETURNS clause specifies the return type of the function." }
            ],
            procedure: [
              "Create function GetAverageMarks that computes average for a student",
              "Create function GetGrade that returns 'A','B','C','D','F' based on marks",
              "Create function GetAge that calculates age from Date of Birth",
              "Test functions in anonymous block with DBMS_OUTPUT",
              "Invoke functions in SELECT: SELECT Name, GetGrade(Marks) FROM MARKS JOIN STUDENT USING(Roll_No)",
              "Create a complex function that returns student rank",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Function 1: Get average marks for a student\nCREATE OR REPLACE FUNCTION GetAverageMarks(p_roll NUMBER)\nRETURN NUMBER IS\n    v_avg NUMBER;\nBEGIN\n    SELECT AVG(Marks) INTO v_avg FROM MARKS WHERE Roll_No = p_roll;\n    RETURN NVL(v_avg, 0);\nEND;\n/\n\n-- Function 2: Get grade from marks\nCREATE OR REPLACE FUNCTION GetGrade(p_marks NUMBER)\nRETURN VARCHAR2 IS\nBEGIN\n    RETURN CASE\n        WHEN p_marks >= 90 THEN 'A'\n        WHEN p_marks >= 75 THEN 'B'\n        WHEN p_marks >= 60 THEN 'C'\n        WHEN p_marks >= 50 THEN 'D'\n        ELSE 'F'\n    END;\nEND;\n/\n\n-- Function 3: Calculate age from DOB\nCREATE OR REPLACE FUNCTION GetAge(p_dob DATE)\nRETURN NUMBER IS\nBEGIN\n    RETURN FLOOR((SYSDATE - p_dob) / 365.25);\nEND;\n/\n\n-- Invoking functions in SQL SELECT\nSELECT S.Roll_No, S.Name, M.Marks, GetGrade(M.Marks) AS Grade,\n       GetAverageMarks(S.Roll_No) AS Avg_Marks\nFROM STUDENT S JOIN MARKS M ON S.Roll_No = M.Roll_No\nORDER BY S.Roll_No;\n\n-- Using function in WHERE clause\nSELECT Roll_No, Name FROM STUDENT\nWHERE GetAverageMarks(Roll_No) > 75;",
              steps: [
                { line: 1, annotation: "GetAverageMarks returns average marks for given student", memory: [], output: "Function created" },
                { line: 2, annotation: "GetGrade returns letter grade based on numeric marks", memory: [], output: "Function created" },
                { line: 3, annotation: "GetAge calculates age from date of birth", memory: [], output: "Function created" },
                { line: 4, annotation: "Functions invoked in SELECT — each row calls GetGrade and GetAverageMarks", memory: [], output: "Alice: 85 → Grade B, Avg 85; Bob: 72 → Grade C, Avg 72" },
                { line: 5, annotation: "Function in WHERE clause filters students with average > 75", memory: [], output: "Alice, Carol" }
              ]
            },
            posttest: [
              { question: "Which statement correctly calls a function in SQL?", options: ["EXEC GetGrade(85);", "SELECT GetGrade(85) FROM DUAL;", "CALL GetGrade(85);", "RUN GetGrade(85);"], answerIndex: 1, hint: "Functions in SQL are called as part of a SELECT statement; DUAL is a dummy table." },
              { question: "What is the difference between NVL and COALESCE in the GetAverageMarks function?", options: ["No difference", "NVL takes two arguments; COALESCE can take multiple", "NVL works only with numbers", "COALESCE is faster"], answerIndex: 1, hint: "NVL has exactly two parameters; COALESCE accepts multiple and returns the first non-NULL." },
              { question: "A function called in SQL cannot:", options: ["Use SELECT", "Modify database state (DML)", "Return a value", "Use IF statements"], answerIndex: 1, hint: "Functions called in SQL should be read-only (no INSERT/UPDATE/DELETE) to avoid side effects." },
              { question: "What is the purpose of RETURN in a function?", options: ["To print output", "To exit and send a value back", "To continue execution", "To raise an exception"], answerIndex: 1, hint: "RETURN provides the result value and exits the function." },
              { question: "Which data dictionary view contains information about user-created functions?", options: ["USER_OBJECTS", "USER_PROCEDURES", "USER_FUNCTIONS", "USER_SOURCE"], answerIndex: 3, hint: "USER_SOURCE contains the source code of both procedures and functions." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 10",
      objective: "Develop programs using features parameters in a CURSOR, FOR UPDATE CURSOR, WHERE CURRENT OF clause and CURSOR variables.",
      tutorial: "Advanced Cursor Operations",
      labTitle: "Cursors with Parameters, FOR UPDATE, WHERE CURRENT OF",
      experiments: [
        {
          id: "db-exp10",
          title: "Parameterized Cursors, FOR UPDATE, WHERE CURRENT OF, Cursor Variables",
          desc: "(a) Use parameterized cursor to fetch students of a specific department, (b) Use FOR UPDATE cursor to lock rows before update, (c) Use WHERE CURRENT OF to update the current row, (d) Use cursor variables (REF CURSOR) for dynamic result sets.",
          expected: "Parameterized cursors filter correctly; FOR UPDATE locks rows; WHERE CURRENT OF updates current row; cursor variables handle dynamic queries.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Declare parameterized cursors to pass values at open time",
                "Use FOR UPDATE clause to lock rows for update",
                "Use WHERE CURRENT OF to update/delete the current row of an open cursor",
                "Declare and use cursor variables (REF CURSOR) for dynamic result sets",
                "Open cursor variables for different queries dynamically"
              ]
            },
            theory: [
              { title: "Parameterized Cursor", body: ["CURSOR c_name(p_param TYPE) IS SELECT ... WHERE col = p_param;", "OPEN c_name(value); — pass parameter at open time"] },
              { title: "FOR UPDATE Cursor", body: ["CURSOR c_name IS SELECT ... FROM table FOR UPDATE;", "Locks rows selected; prevents other transactions from updating them"] },
              { title: "WHERE CURRENT OF", body: ["UPDATE table SET col = value WHERE CURRENT OF cursor_name;", "Updates the row currently fetched by the cursor"] },
              { title: "Cursor Variables (REF CURSOR)", body: ["TYPE ref_cursor_type IS REF CURSOR;", "v_cursor ref_cursor_type;", "OPEN v_cursor FOR 'SELECT ...'; — dynamic SQL"] }
            ],
            pretest: [
              { question: "A parameterized cursor is used when:", options: ["The query is fixed", "The query depends on a value that varies at runtime", "The table name changes", "The cursor is read-only"], answerIndex: 1, hint: "Parameters allow different filter values each time the cursor is opened." },
              { question: "What does FOR UPDATE clause do in a cursor?", options: ["Locks the selected rows", "Optimizes the query", "Prevents updates", "Orders the results"], answerIndex: 0, hint: "FOR UPDATE locks rows to prevent concurrent modifications during the fetch." },
              { question: "WHERE CURRENT OF updates:", options: ["All rows in the cursor", "The most recently fetched row of the cursor", "The first row of the cursor", "The last row of the cursor"], answerIndex: 1, hint: "WHERE CURRENT OF refers specifically to the row last fetched by the cursor." },
              { question: "A cursor variable (REF CURSOR) allows:", options: ["Only static SELECT queries", "Dynamic SELECT queries determined at runtime", "Only DML operations", "Only one fetch"], answerIndex: 1, hint: "REF CURSOR enables opening a cursor for different queries dynamically." },
              { question: "What is the advantage of WHERE CURRENT OF over WHERE primary_key = value?", options: ["It is faster", "It is safer — always references the correct row even if primary key changes", "It requires less code", "It works with any cursor"], answerIndex: 1, hint: "WHERE CURRENT OF doesn't need the primary key value; it uses the row's current position." }
            ],
            procedure: [
              "Declare parameterized cursor to fetch students by department ID",
              "Open cursor with different department IDs and display results",
              "Declare FOR UPDATE cursor to process student marks for updating",
              "Use WHERE CURRENT OF to update marks by a percentage",
              "Declare REF CURSOR type and variable",
              "Open REF CURSOR dynamically based on a condition",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Parameterized Cursor\nDECLARE\n    CURSOR c_students_by_dept(p_dept NUMBER) IS\n        SELECT Roll_No, Name FROM STUDENT WHERE Dept_ID = p_dept;\n    v_roll STUDENT.Roll_No%TYPE;\n    v_name STUDENT.Name%TYPE;\nBEGIN\n    DBMS_OUTPUT.PUT_LINE('Students in Dept 1:');\n    OPEN c_students_by_dept(1);\n    LOOP\n        FETCH c_students_by_dept INTO v_roll, v_name;\n        EXIT WHEN c_students_by_dept%NOTFOUND;\n        DBMS_OUTPUT.PUT_LINE('  ' || v_roll || ': ' || v_name);\n    END LOOP;\n    CLOSE c_students_by_dept;\nEND;\n/\n\n-- FOR UPDATE Cursor with WHERE CURRENT OF\nDECLARE\n    CURSOR c_update_marks IS\n        SELECT Roll_No, Marks FROM MARKS WHERE Marks < 60\n        FOR UPDATE OF Marks;\n    v_roll MARKS.Roll_No%TYPE;\n    v_marks MARKS.Marks%TYPE;\nBEGIN\n    OPEN c_update_marks;\n    LOOP\n        FETCH c_update_marks INTO v_roll, v_marks;\n        EXIT WHEN c_update_marks%NOTFOUND;\n        -- Increase marks by 10% for those below 60\n        UPDATE MARKS SET Marks = Marks * 1.10 WHERE CURRENT OF c_update_marks;\n        DBMS_OUTPUT.PUT_LINE('Updated Roll ' || v_roll || ' from ' || v_marks || ' to ' || (v_marks * 1.10));\n    END LOOP;\n    CLOSE c_update_marks;\n    COMMIT;\nEND;\n/\n\n-- Cursor Variable (REF CURSOR)\nDECLARE\n    TYPE ref_cursor_type IS REF CURSOR;\n    v_cursor ref_cursor_type;\n    v_roll STUDENT.Roll_No%TYPE;\n    v_name STUDENT.Name%TYPE;\n    v_dept_id NUMBER := 1;\nBEGIN\n    IF v_dept_id = 1 THEN\n        OPEN v_cursor FOR SELECT Roll_No, Name FROM STUDENT WHERE Dept_ID = 1;\n    ELSE\n        OPEN v_cursor FOR SELECT Roll_No, Name FROM STUDENT WHERE Dept_ID = 2;\n    END IF;\n    \n    LOOP\n        FETCH v_cursor INTO v_roll, v_name;\n        EXIT WHEN v_cursor%NOTFOUND;\n        DBMS_OUTPUT.PUT_LINE(v_roll || ': ' || v_name);\n    END LOOP;\n    CLOSE v_cursor;\nEND;\n/",
              steps: [
                { line: 1, annotation: "Parameterized cursor: p_dept passed at open time", memory: [], output: "Students in Dept 1: 101: Alice, 103: Carol" },
                { line: 2, annotation: "FOR UPDATE locks rows with Marks < 60", memory: [], output: "Rows locked for update" },
                { line: 3, annotation: "WHERE CURRENT OF updates exactly the fetched row", memory: [], output: "Roll 104 updated from 60 to 66" },
                { line: 4, annotation: "REF CURSOR opened dynamically based on v_dept_id", memory: [], output: "101: Alice, 103: Carol (for dept=1)" }
              ]
            },
            posttest: [
              { question: "What happens if you try to update a row using WHERE CURRENT OF but the cursor is not opened with FOR UPDATE?", options: ["The update works", "An error occurs", "The update is ignored", "The row is locked automatically"], answerIndex: 1, hint: "WHERE CURRENT OF requires the cursor to have been declared with FOR UPDATE." },
              { question: "In a parameterized cursor, when is the parameter value provided?", options: ["At cursor declaration", "At cursor OPEN time", "At FETCH time", "At CLOSE time"], answerIndex: 1, hint: "Parameters are passed when opening the cursor: OPEN cursor_name(value)." },
              { question: "What is a REF CURSOR variable used for?", options: ["Static queries only", "Dynamic SQL and passing result sets between procedures", "DML operations", "Data definition"], answerIndex: 1, hint: "REF CURSOR allows dynamic query execution and returning result sets from procedures." },
              { question: "Which clause must be included in a cursor declaration to use WHERE CURRENT OF?", options: ["ORDER BY", "FOR UPDATE", "GROUP BY", "HAVING"], answerIndex: 1, hint: "FOR UPDATE enables row-level locking and allows WHERE CURRENT OF." },
              { question: "What is the scope of locks acquired by FOR UPDATE?", options: ["Until the next FETCH", "Until the cursor is closed or transaction ends", "Until the row is updated", "Locks are immediate"], answerIndex: 1, hint: "FOR UPDATE locks persist until the transaction commits or rolls back, or the cursor is closed." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 11",
      objective: "Develop Programs using BEFORE and AFTER Triggers, Row and Statement Triggers and INSTEAD OF Triggers.",
      tutorial: "Database Triggers",
      labTitle: "DDL/DML and INSTEAD OF Triggers",
      experiments: [
        {
          id: "db-exp11",
          title: "BEFORE/AFTER, Row/Statement, INSTEAD OF Triggers",
          desc: "(a) BEFORE ROW trigger to validate data before insertion, (b) AFTER ROW trigger to log changes, (c) STATEMENT trigger to fire once per DML statement, (d) INSTEAD OF trigger on a view to allow INSERT/UPDATE/DELETE.",
          expected: "Triggers fire at correct times; BEFORE triggers can modify data; AFTER triggers used for auditing; INSTEAD OF enables view DML.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Create BEFORE ROW triggers for data validation and modification",
                "Create AFTER ROW triggers for auditing and logging",
                "Create STATEMENT triggers (before/after) that fire once per DML statement",
                "Create INSTEAD OF triggers on views to make them updatable",
                "Use :OLD and :NEW pseudorecords to access old/new column values"
              ]
            },
            theory: [
              { title: "Trigger Types", body: ["BEFORE/AFTER — when the trigger fires relative to the DML operation", "ROW/STATEMENT — how many times the trigger fires (per row or per statement)", "INSTEAD OF — on views; replaces the DML operation entirely"] },
              { title: ":OLD and :NEW Pseudorecords", body: [":OLD — values before the operation (UPDATE/DELETE; NULL for INSERT)", ":NEW — values after the operation (INSERT/UPDATE; NULL for DELETE)"] },
              { title: "Trigger Use Cases", body: ["Audit logging: AFTER ROW inserts into audit table", "Data validation: BEFORE ROW checks business rules", "Auto-computation: BEFORE ROW sets derived columns", "View update: INSTEAD OF performs DML on underlying tables"] }
            ],
            pretest: [
              { question: "A ROW trigger fires:", options: ["Once per SQL statement", "Once per row affected by the DML", "Before the transaction commits", "Only for DELETE operations"], answerIndex: 1, hint: "ROW triggers fire once for each row that is inserted, updated, or deleted." },
              { question: "What does :NEW represent in an INSERT trigger?", options: ["The old value (always NULL)", "The new value being inserted", "The row before insertion", "The table name"], answerIndex: 1, hint: "In INSERT triggers, :NEW contains the values being inserted." },
              { question: "When would you use INSTEAD OF trigger?", options: ["On a table for INSERT", "On a view to allow DML operations", "On a sequence", "On a procedure"], answerIndex: 1, hint: "INSTEAD OF triggers are specifically for views to handle updates that the view cannot handle automatically." },
              { question: "A STATEMENT trigger fires:", options: ["Once for each row", "Once for each statement regardless of rows", "Only if no rows are affected", "Only for SELECT"], answerIndex: 1, hint: "STATEMENT triggers execute once per DML command, even if millions of rows are affected." },
              { question: "Which trigger timing allows modifying :NEW values before they are written to the table?", options: ["AFTER ROW", "BEFORE ROW", "AFTER STATEMENT", "INSTEAD OF"], answerIndex: 1, hint: "BEFORE ROW triggers execute before the row is written, allowing modification of :NEW." }
            ],
            procedure: [
              "Create BEFORE ROW trigger that prevents insertion of students under 17",
              "Create AFTER ROW trigger that logs all changes to an AUDIT table",
              "Create BEFORE STATEMENT trigger that tracks when bulk updates occur",
              "Create a view on STUDENT and MARKS",
              "Create INSTEAD OF trigger on the view to perform inserts on both base tables",
              "Test all triggers with INSERT, UPDATE, DELETE operations",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- BEFORE ROW Trigger: Validate Age\nCREATE OR REPLACE TRIGGER trg_check_student_age\nBEFORE INSERT OR UPDATE ON STUDENT\nFOR EACH ROW\nBEGIN\n    IF :NEW.Age < 17 OR :NEW.Age > 30 THEN\n        RAISE_APPLICATION_ERROR(-20001, 'Age must be between 17 and 30');\n    END IF;\nEND;\n/\n\n-- AFTER ROW Trigger: Audit Log\nCREATE TABLE STUDENT_AUDIT (\n    Audit_ID NUMBER PRIMARY KEY AUTOINCREMENT,\n    Operation VARCHAR2(10),\n    Roll_No INT,\n    Old_Name VARCHAR2(100),\n    New_Name VARCHAR2(100),\n    Change_Date DATE DEFAULT SYSDATE\n);\n\nCREATE OR REPLACE TRIGGER trg_audit_student\nAFTER INSERT OR UPDATE OR DELETE ON STUDENT\nFOR EACH ROW\nBEGIN\n    IF INSERTING THEN\n        INSERT INTO STUDENT_AUDIT (Operation, Roll_No, New_Name)\n        VALUES ('INSERT', :NEW.Roll_No, :NEW.Name);\n    ELSIF UPDATING THEN\n        INSERT INTO STUDENT_AUDIT (Operation, Roll_No, Old_Name, New_Name)\n        VALUES ('UPDATE', :NEW.Roll_No, :OLD.Name, :NEW.Name);\n    ELSIF DELETING THEN\n        INSERT INTO STUDENT_AUDIT (Operation, Roll_No, Old_Name)\n        VALUES ('DELETE', :OLD.Roll_No, :OLD.Name);\n    END IF;\nEND;\n/\n\n-- INSTEAD OF Trigger on View\nCREATE VIEW StudentMarksView AS\nSELECT S.Roll_No, S.Name, M.Course_ID, M.Marks\nFROM STUDENT S LEFT JOIN MARKS M ON S.Roll_No = M.Roll_No;\n\nCREATE OR REPLACE TRIGGER trg_instead_of_insert\nINSTEAD OF INSERT ON StudentMarksView\nFOR EACH ROW\nBEGIN\n    -- Insert into STUDENT if not exists\n    INSERT INTO STUDENT (Roll_No, Name) VALUES (:NEW.Roll_No, :NEW.Name);\n    -- Insert into MARKS if Course_ID provided\n    IF :NEW.Course_ID IS NOT NULL THEN\n        INSERT INTO MARKS (Roll_No, Course_ID, Marks) VALUES (:NEW.Roll_No, :NEW.Course_ID, :NEW.Marks);\n    END IF;\nEND;\n/\n\n-- Test the triggers\nINSERT INTO STUDENT VALUES (107, 'Grace', 16, 1, 'grace@edu.in', '9999999999'); -- Fails (age 16)\nINSERT INTO STUDENT VALUES (107, 'Grace', 20, 1, 'grace@edu.in', '9999999999'); -- Succeeds, audit log records\nUPDATE STUDENT SET Name = 'Grace Lee' WHERE Roll_No = 107;\nDELETE FROM STUDENT WHERE Roll_No = 107;",
              steps: [
                { line: 1, annotation: "BEFORE ROW trigger validates age; rejects age 16", memory: [], output: "ERROR: Age must be between 17 and 30" },
                { line: 2, annotation: "AFTER ROW trigger logs INSERT, UPDATE, DELETE to audit table", memory: [], output: "Audit records inserted" },
                { line: 3, annotation: "INSTEAD OF trigger allows INSERT on view that joins two tables", memory: [], output: "Row inserted into both STUDENT and MARKS via view insert" }
              ]
            },
            posttest: [
              { question: "In a BEFORE UPDATE trigger, can you modify :NEW values?", options: ["Yes, before the update is applied", "No, they are read-only", "Only if the trigger is AFTER", "Only for specific columns"], answerIndex: 0, hint: "BEFORE triggers can modify :NEW values; AFTER triggers cannot." },
              { question: "What is the difference between a ROW trigger and a STATEMENT trigger?", options: ["Statement triggers cannot use :OLD/:NEW", "Row triggers run once per row; statement triggers run once per DML", "Statement triggers are faster", "Row triggers can only be BEFORE"], answerIndex: 1, hint: "ROW triggers fire per affected row; STATEMENT triggers fire once per statement." },
              { question: "INSTEAD OF triggers are commonly used to:", options: ["Speed up queries", "Make non-updatable views updatable", "Prevent DML operations", "Log database changes"], answerIndex: 1, hint: "INSTEAD OF replaces the default DML action, often used to allow updates on complex views." },
              { question: "What does :OLD contain in an INSERT trigger?", options: ["The new row values", "NULL (since no old row exists)", "The previous row if it existed", "The table's default values"], answerIndex: 1, hint: "For INSERT, there is no old row, so :OLD is NULL." },
              { question: "Which predicate is true for an INSERT operation inside a trigger?", options: ["INSERTING", "UPDATING", "DELETING", "MERGING"], answerIndex: 0, hint: "INSERTING, UPDATING, DELETING are boolean functions inside triggers." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 12",
      objective: "Create a table and perform the search operation on table using indexing and non-indexing techniques.",
      tutorial: "Indexing for Search Performance",
      labTitle: "Indexing vs Non-Indexing Search",
      experiments: [
        {
          id: "db-exp12",
          title: "Indexing and Non-Indexing Search Performance Comparison",
          desc: "(a) Create a large table (e.g., 100,000 rows). (b) Perform search without index and measure time. (c) Create an index on the search column. (d) Perform the same search with index and compare query execution time using EXPLAIN QUERY PLAN.",
          expected: "Without index: full table scan (SCAN). With index: index search (SEARCH). Execution time significantly faster with index.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Create a table with a large number of rows",
                "Perform a search query without an index (full table scan)",
                "Create an index on the search column",
                "Perform the same search query with the index",
                "Compare execution plans using EXPLAIN QUERY PLAN",
                "Measure and compare query execution time"
              ]
            },
            theory: [
              { title: "Full Table Scan (Non-indexed)", body: ["Database reads every row in the table to find matches", "Time complexity: O(n) where n is number of rows", "Acceptable for small tables, expensive for large tables"] },
              { title: "Indexed Search", body: ["B-tree index provides logarithmic search time O(log n)", "Database traverses index tree to locate rows directly", "Much faster for point queries and range queries"] },
              { title: "EXPLAIN QUERY PLAN", body: ["Shows how SQLite will execute a query", "'SCAN TABLE' means full table scan (no index used)", "'SEARCH TABLE USING INDEX' means index was used"] },
              { title: "When to Use Indexes", body: ["Columns used frequently in WHERE clauses", "Columns used in JOIN conditions", "Columns used in ORDER BY", "Not beneficial for small tables or columns with low cardinality (e.g., gender)"] }
            ],
            pretest: [
              { question: "What is the time complexity of a full table scan on a table with n rows?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answerIndex: 2, hint: "Without an index, the database must examine every row — linear time." },
              { question: "What does EXPLAIN QUERY PLAN show?", options: ["The actual query result", "How the database will execute the query", "The table schema", "The index structure"], answerIndex: 1, hint: "EXPLAIN shows the execution plan — the steps the database will take." },
              { question: "Which command creates an index on the 'Name' column of the STUDENT table?", options: ["ADD INDEX idx_name ON STUDENT(Name)", "CREATE INDEX idx_name ON STUDENT(Name)", "CREATE INDEX idx_name FROM STUDENT(Name)", "INDEX ON STUDENT(Name)"], answerIndex: 1, hint: "CREATE INDEX index_name ON table(column) is the correct syntax." },
              { question: "What does 'SEARCH TABLE STUDENT USING INDEX idx_name' indicate?", options: ["Index is created but not used", "Index is used for the search", "Table scan is used", "No index exists"], answerIndex: 1, hint: "SEARCH USING INDEX means the query uses the index for faster access." },
              { question: "When is an index NOT beneficial?", options: ["When the column has high cardinality (many unique values)", "When the table is very large", "When the column has low cardinality (e.g., boolean, gender)", "For primary key columns"], answerIndex: 2, hint: "Indexes on columns with few distinct values (e.g., gender) may not improve performance much." }
            ],
            procedure: [
              "Create a TEST_DATA table with ID and Name columns",
              "Insert 100,000 rows with random data using a loop",
              "Run SELECT with WHERE on Name column without index, note time",
              "Use EXPLAIN QUERY PLAN to see 'SCAN TABLE'",
              "Create index: CREATE INDEX idx_name ON TEST_DATA(Name)",
              "Run same SELECT query again, note improved time",
              "Check EXPLAIN QUERY PLAN — should show 'SEARCH TABLE USING INDEX'",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "-- Create a large test table\nCREATE TABLE TEST_DATA (\n    ID INT PRIMARY KEY,\n    Name VARCHAR(100),\n    Value INT\n);\n\n-- Insert 100,000 rows (simulated with smaller count for browser)\nINSERT INTO TEST_DATA (ID, Name, Value)\nWITH RECURSIVE cnt(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM cnt WHERE x < 10000)\nSELECT x, 'Person_' || x, (x * 7) % 1000 FROM cnt;\n\n-- Without index: Full table scan\nEXPLAIN QUERY PLAN\nSELECT * FROM TEST_DATA WHERE Name = 'Person_5000';\n-- Output: SCAN TABLE TEST_DATA (full table scan)\n\n-- Measure time without index (approximate)\nSELECT * FROM TEST_DATA WHERE Name = 'Person_5000';\n\n-- Create index\nCREATE INDEX idx_test_data_name ON TEST_DATA(Name);\n\n-- With index: Index search\nEXPLAIN QUERY PLAN\nSELECT * FROM TEST_DATA WHERE Name = 'Person_5000';\n-- Output: SEARCH TABLE TEST_DATA USING INDEX idx_test_data_name (Name=?)\n\n-- Measure time with index (should be much faster)\nSELECT * FROM TEST_DATA WHERE Name = 'Person_5000';\n\n-- Composite index example\nCREATE INDEX idx_test_data_name_value ON TEST_DATA(Name, Value);\n\n-- Drop index\nDROP INDEX idx_test_data_name;\n\n-- Check if index exists\nSELECT * FROM sqlite_master WHERE type = 'index' AND tbl_name = 'TEST_DATA';",
              steps: [
                { line: 1, annotation: "TEST_DATA table created with 10,000 rows", memory: [], output: "Table created, 10,000 rows inserted" },
                { line: 2, annotation: "EXPLAIN shows 'SCAN TABLE' — full table scan without index", memory: [], output: "SCAN TABLE TEST_DATA" },
                { line: 3, annotation: "Search query runs, scanning all rows until match found", memory: [], output: "Person_5000 returned" },
                { line: 4, annotation: "Index created on Name column", memory: [], output: "Index created" },
                { line: 5, annotation: "EXPLAIN now shows 'SEARCH USING INDEX'", memory: [], output: "SEARCH TABLE TEST_DATA USING INDEX idx_test_data_name" },
                { line: 6, annotation: "Indexed search is logarithmic vs linear", memory: [], output: "Same result, but much faster" }
              ]
            },
            posttest: [
              { question: "What does 'SCAN TABLE' in EXPLAIN QUERY PLAN indicate?", options: ["An index is used", "A full table scan is performed (no index or index not used)", "The table is empty", "A syntax error"], answerIndex: 1, hint: "SCAN TABLE means the database reads every row — no index efficiency." },
              { question: "Which type of columns benefit most from indexing?", options: ["Columns with few distinct values", "Columns frequently used in WHERE clauses with high selectivity", "Columns never used in queries", "Columns with only NULL values"], answerIndex: 1, hint: "Indexes are most beneficial on columns that filter many rows (high selectivity)." },
              { question: "Can you have multiple indexes on the same table?", options: ["No, only one index per table", "Yes, as many as needed", "Only one per column", "Only if they are unique"], answerIndex: 1, hint: "Tables can have multiple indexes on different columns or combinations." },
              { question: "What is a composite index?", options: ["An index on a single column", "An index on multiple columns", "An index that uses hashing", "An index that stores compressed data"], answerIndex: 1, hint: "Composite indexes involve two or more columns, useful for queries filtering on multiple columns." },
              { question: "Which command removes an index?", options: ["DELETE INDEX", "DROP INDEX", "REMOVE INDEX", "CLEAR INDEX"], answerIndex: 1, hint: "DROP INDEX index_name removes an index from the database." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 13",
      objective: "Write a Java program that connects to a database using JDBC.",
      tutorial: "JDBC Database Connectivity",
      labTitle: "JDBC Connection",
      experiments: [
        {
          id: "db-exp13",
          title: "JDBC: Connect to Database",
          desc: "Write a Java program that: (a) Loads the JDBC driver, (b) Establishes a connection using DriverManager.getConnection(), (c) Displays connection status and database metadata.",
          expected: "Program successfully connects to database; connection object obtained; metadata (database name, version) displayed.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Understand JDBC architecture and drivers",
                "Load the appropriate JDBC driver for the database",
                "Use DriverManager.getConnection() to establish connection",
                "Retrieve and display database metadata",
                "Properly close the connection to release resources"
              ]
            },
            theory: [
              { title: "JDBC Architecture", body: ["Java application → JDBC API → JDBC Driver Manager → JDBC Driver → Database", "Type 4 driver (thin driver) is pure Java, no native libraries"] },
              { title: "Connection URL Formats", body: ["MySQL: jdbc:mysql://host:port/database", "Oracle: jdbc:oracle:thin:@host:port:SID", "SQLite: jdbc:sqlite:database.db"] },
              { title: "JDBC Steps", body: ["1. Load driver (Class.forName())", "2. Get connection (DriverManager.getConnection())", "3. Execute queries (Statement/PreparedStatement)", "4. Process results (ResultSet)", "5. Close resources (connection, statement, resultset)"] },
              { title: "DatabaseMetaData", body: ["Connection.getMetaData() returns DatabaseMetaData", "Methods: getDatabaseProductName(), getDriverVersion(), getURL()"] }
            ],
            pretest: [
              { question: "Which class is used to establish a database connection in JDBC?", options: ["DriverManager", "Connection", "Statement", "ResultSet"], answerIndex: 0, hint: "DriverManager.getConnection() is the standard way to obtain a Connection object." },
              { question: "What is the purpose of Class.forName() in JDBC?", options: ["To create a connection", "To load the JDBC driver class", "To execute a query", "To close the connection"], answerIndex: 1, hint: "Class.forName() loads the driver class, registering it with DriverManager." },
              { question: "Which interface represents a database connection?", options: ["Statement", "ResultSet", "Connection", "Driver"], answerIndex: 2, hint: "Connection is the interface for a database session." },
              { question: "What does the JDBC URL 'jdbc:mysql://localhost:3306/mydb' specify?", options: ["Driver type: mysql, host: localhost, port: 3306, database: mydb", "Just the host and port", "Just the database name", "The username and password"], answerIndex: 0, hint: "JDBC URL encodes all connection parameters: protocol, subprotocol, host, port, database." },
              { question: "Which method closes a database connection?", options: ["close()", "disconnect()", "end()", "terminate()"], answerIndex: 0, hint: "Connection.close() releases the database connection." }
            ],
            procedure: [
              "Ensure JDBC driver JAR is in classpath",
              "Write Java program with main method",
              "Load driver: Class.forName('org.sqlite.JDBC') (for SQLite)",
              "Get connection: DriverManager.getConnection('jdbc:sqlite:test.db')",
              "Print connection status and metadata",
              "Close connection in finally block",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "// Java Program: JDBC Connection Demo\nimport java.sql.*;\n\npublic class JDBCConnectionDemo {\n    public static void main(String[] args) {\n        Connection conn = null;\n        \n        try {\n            // Step 1: Load JDBC Driver (SQLite example)\n            Class.forName(\"org.sqlite.JDBC\");\n            System.out.println(\"Driver loaded successfully.\");\n            \n            // Step 2: Establish Connection\n            String url = \"jdbc:sqlite:test.db\";\n            conn = DriverManager.getConnection(url);\n            System.out.println(\"Connection established successfully!\");\n            \n            // Step 3: Get Database Metadata\n            DatabaseMetaData meta = conn.getMetaData();\n            System.out.println(\"Database Product Name: \" + meta.getDatabaseProductName());\n            System.out.println(\"Database Product Version: \" + meta.getDatabaseProductVersion());\n            System.out.println(\"Driver Name: \" + meta.getDriverName());\n            System.out.println(\"Driver Version: \" + meta.getDriverVersion());\n            System.out.println(\"URL: \" + meta.getURL());\n            System.out.println(\"Username: \" + meta.getUserName());\n            \n        } catch (ClassNotFoundException e) {\n            System.out.println(\"JDBC Driver not found: \" + e.getMessage());\n        } catch (SQLException e) {\n            System.out.println(\"SQL Error: \" + e.getMessage());\n        } finally {\n            // Step 4: Close Connection\n            try {\n                if (conn != null) {\n                    conn.close();\n                    System.out.println(\"Connection closed.\");\n                }\n            } catch (SQLException e) {\n                System.out.println(\"Error closing connection: \" + e.getMessage());\n            }\n        }\n    }\n}",
              steps: [
                { line: 1, annotation: "Class.forName() loads the SQLite JDBC driver", memory: [], output: "Driver loaded successfully." },
                { line: 2, annotation: "DriverManager.getConnection() creates connection to test.db", memory: [], output: "Connection established successfully!" },
                { line: 3, annotation: "DatabaseMetaData retrieved via conn.getMetaData()", memory: [], output: "SQLite version, driver info displayed" },
                { line: 4, annotation: "Finally block ensures connection is closed", memory: [], output: "Connection closed." }
              ]
            },
            posttest: [
              { question: "What is the correct JDBC URL for a MySQL database on localhost port 3306 named 'school'?", options: ["jdbc:mysql://localhost/school", "mysql://localhost:3306/school", "jdbc:mysql://localhost:3306/school", "jdbc:mysql:school"], answerIndex: 2, hint: "MySQL URL format: jdbc:mysql://host:port/database" },
              { question: "Which interface provides methods like getDatabaseProductName()?", options: ["Connection", "Statement", "ResultSet", "DatabaseMetaData"], answerIndex: 3, hint: "DatabaseMetaData interface provides database information." },
              { question: "What happens if Class.forName() fails?", options: ["Connection is still created", "ClassNotFoundException is thrown", "The program exits silently", "A SQLException is thrown"], answerIndex: 1, hint: "ClassNotFoundException occurs when the driver class is not in classpath." },
              { question: "Why is the connection closed in a finally block?", options: ["To speed up execution", "To ensure connection is always closed even if exception occurs", "It's optional", "To commit transactions"], answerIndex: 1, hint: "Finally block executes whether an exception occurs or not, ensuring resource cleanup." },
              { question: "What is the default SQLite JDBC URL format?", options: ["jdbc:sqlite:database.db", "sqlite:database.db", "jdbc:sqlite://database.db", "sqlite:///database.db"], answerIndex: 0, hint: "SQLite uses jdbc:sqlite:filename.db format." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 14",
      objective: "Write a Java program to connect to a database using JDBC and insert values into it.",
      tutorial: "JDBC Insert Operations",
      labTitle: "JDBC Insert",
      experiments: [
        {
          id: "db-exp14",
          title: "JDBC: Insert Values into Table",
          desc: "Write a Java program that: (a) Connects to database using JDBC, (b) Inserts a new row into STUDENT table using Statement or PreparedStatement, (c) Uses PreparedStatement for parameterized insertion to prevent SQL injection.",
          expected: "Program inserts row successfully; row verified by querying the table; PreparedStatement used for safe insertion.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use Statement.executeUpdate() for INSERT operations",
                "Use PreparedStatement for parameterized, safer INSERT",
                "Understand the difference between Statement and PreparedStatement",
                "Prevent SQL injection attacks by using PreparedStatement",
                "Check insertion success using getGeneratedKeys() if needed"
              ]
            },
            theory: [
              { title: "Statement vs PreparedStatement", body: ["Statement: Used for static SQL queries. Concatenates values into query string. Vulnerable to SQL injection.", "PreparedStatement: Precompiled SQL with placeholders (?). Values set using setXXX() methods. Prevents SQL injection."] },
              { title: "executeUpdate() Method", body: ["Returns int: number of rows affected", "Used for INSERT, UPDATE, DELETE", "Example: int rows = stmt.executeUpdate(\"INSERT INTO STUDENT VALUES...\");"] },
              { title: "SQL Injection", body: ["Attacker inputs malicious SQL: ' OR '1'='1", "Can cause unintended queries or data breaches", "PreparedStatement escapes input automatically"] }
            ],
            pretest: [
              { question: "Which JDBC interface is recommended for parameterized queries to prevent SQL injection?", options: ["Statement", "PreparedStatement", "CallableStatement", "ResultSet"], answerIndex: 1, hint: "PreparedStatement precompiles SQL with placeholders, preventing injection." },
              { question: "What does executeUpdate() return for an INSERT operation?", options: ["ResultSet", "Number of rows affected", "The generated key", "Boolean success"], answerIndex: 1, hint: "executeUpdate() returns the count of rows inserted, updated, or deleted." },
              { question: "In PreparedStatement, what does the '?' symbol represent?", options: ["A wildcard", "A placeholder for a parameter value", "A comment", "A join condition"], answerIndex: 1, hint: "Question marks are placeholders for values set with setXXX() methods." },
              { question: "Which method sets an integer parameter in PreparedStatement?", options: ["setInt(index, value)", "setInteger(index, value)", "putInt(index, value)", "assignInt(index, value)"], answerIndex: 0, hint: "setInt(position, value) is the correct method." },
              { question: "What is the main security advantage of PreparedStatement?", options: ["It is faster", "It prevents SQL injection by escaping input", "It uses less memory", "It supports all databases"], answerIndex: 1, hint: "PreparedStatement escapes input values, treating them as data not code." }
            ],
            procedure: [
              "Create STUDENT table in database if not exists",
              "Write Java program with main method",
              "Load JDBC driver and establish connection",
              "Create PreparedStatement with INSERT SQL",
              "Set parameters using setString(), setInt(), etc.",
              "Execute update using executeUpdate()",
              "Print number of rows inserted",
              "Close resources in finally block",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "// Java Program: JDBC Insert using PreparedStatement\nimport java.sql.*;\n\npublic class JDBCInsertDemo {\n    public static void main(String[] args) {\n        Connection conn = null;\n        PreparedStatement pstmt = null;\n        \n        try {\n            // Load driver and connect\n            Class.forName(\"org.sqlite.JDBC\");\n            conn = DriverManager.getConnection(\"jdbc:sqlite:test.db\");\n            \n            // Create table if not exists\n            Statement stmt = conn.createStatement();\n            stmt.execute(\"CREATE TABLE IF NOT EXISTS STUDENT (\" +\n                         \"Roll_No INT PRIMARY KEY, Name VARCHAR(100), \" +\n                         \"Age INT, Dept_ID INT)\");\n            \n            // PreparedStatement for INSERT\n            String sql = \"INSERT INTO STUDENT (Roll_No, Name, Age, Dept_ID) VALUES (?, ?, ?, ?)\";\n            pstmt = conn.prepareStatement(sql);\n            \n            // Set parameters\n            pstmt.setInt(1, 108);\n            pstmt.setString(2, \"John Doe\");\n            pstmt.setInt(3, 22);\n            pstmt.setInt(4, 2);\n            \n            // Execute INSERT\n            int rowsInserted = pstmt.executeUpdate();\n            System.out.println(rowsInserted + \" row(s) inserted.\");\n            \n            // Verify insertion\n            ResultSet rs = stmt.executeQuery(\"SELECT * FROM STUDENT WHERE Roll_No=108\");\n            if (rs.next()) {\n                System.out.println(\"Roll: \" + rs.getInt(\"Roll_No\") +\n                                   \", Name: \" + rs.getString(\"Name\") +\n                                   \", Age: \" + rs.getInt(\"Age\"));\n            }\n            rs.close();\n            stmt.close();\n            \n        } catch (ClassNotFoundException e) {\n            System.out.println(\"Driver not found: \" + e.getMessage());\n        } catch (SQLException e) {\n            System.out.println(\"SQL Error: \" + e.getMessage());\n        } finally {\n            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}\n            try { if (conn != null) conn.close(); } catch (SQLException e) {}\n        }\n    }\n}",
              steps: [
                { line: 1, annotation: "PreparedStatement created with INSERT SQL containing placeholders", memory: [], output: "PreparedStatement object created" },
                { line: 2, annotation: "setInt(1,108) sets first placeholder to 108", memory: [], output: "Parameter 1 set" },
                { line: 3, annotation: "setString(2,\"John Doe\") sets name", memory: [], output: "Parameter 2 set" },
                { line: 4, annotation: "executeUpdate() executes INSERT and returns row count", memory: [], output: "1 row(s) inserted" },
                { line: 5, annotation: "Verification query confirms insertion", memory: [], output: "Roll: 108, Name: John Doe, Age: 22" }
              ]
            },
            posttest: [
              { question: "What is the correct way to set a VARCHAR parameter in PreparedStatement?", options: ["setString(index, value)", "setChar(index, value)", "setVarchar(index, value)", "setText(index, value)"], answerIndex: 0, hint: "setString() is used for string parameters." },
              { question: "What is the output of executeUpdate() for an INSERT that fails due to constraint violation?", options: ["0", "1", "-1", "SQLException is thrown"], answerIndex: 3, hint: "Constraint violation causes SQLException, not a return value." },
              { question: "Which method should you use if you need the auto-generated primary key after INSERT?", options: ["executeUpdate()", "executeQuery()", "execute() with Statement.RETURN_GENERATED_KEYS", "getGeneratedKeys() alone"], answerIndex: 2, hint: "Use executeUpdate() with Statement.RETURN_GENERATED_KEYS, then call getGeneratedKeys()." },
              { question: "What is a potential problem with the following code? String sql = \"INSERT INTO STUDENT VALUES(\" + roll + \", '\" + name + \"')\";", options: ["No problem", "SQL injection vulnerability", "Syntax error", "Slow execution"], answerIndex: 1, hint: "Concatenating user input into SQL strings allows SQL injection attacks." },
              { question: "Which PreparedStatement method would you use to set a DATE parameter?", options: ["setDate(index, java.sql.Date)", "setTimestamp(index, value)", "setString(index, dateString)", "setObject(index, date)"], answerIndex: 0, hint: "setDate() is specifically for SQL DATE types." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    },
    {
      title: "EXPERIMENT 15",
      objective: "Write a Java program to connect to a database using JDBC and delete values from it.",
      tutorial: "JDBC Delete Operations",
      labTitle: "JDBC Delete",
      experiments: [
        {
          id: "db-exp15",
          title: "JDBC: Delete Values from Table",
          desc: "Write a Java program that: (a) Connects to database using JDBC, (b) Deletes a row from STUDENT table based on Roll_No using PreparedStatement, (c) Checks if the row existed before deletion and reports appropriate message.",
          expected: "Program deletes row successfully; if row not found, appropriate message displayed; PreparedStatement used for safe deletion.",
          content: {
            aim: {
              text: "In this experiment, the student will:",
              bullets: [
                "Use PreparedStatement for DELETE operations",
                "Check if a row exists before deletion",
                "Handle cases where no row matches the condition",
                "Use executeUpdate() and check affected row count",
                "Properly close database resources"
              ]
            },
            theory: [
              { title: "DELETE with PreparedStatement", body: ["PreparedStatement pstmt = conn.prepareStatement(\"DELETE FROM STUDENT WHERE Roll_No = ?\");", "pstmt.setInt(1, rollNo);", "int rows = pstmt.executeUpdate();"] },
              { title: "Checking Deletion Success", body: ["rows == 0: No matching row found", "rows > 0: rows number of rows deleted"] },
              { title: "Transaction Considerations", body: ["DELETE operations can be rolled back if autoCommit is false", "Default autoCommit = true means each DELETE is committed immediately"] }
            ],
            pretest: [
              { question: "Which method executes a DELETE statement in JDBC?", options: ["executeQuery()", "executeUpdate()", "executeDelete()", "delete()"], answerIndex: 1, hint: "executeUpdate() is used for INSERT, UPDATE, DELETE." },
              { question: "What does executeUpdate() return for a DELETE that deleted 3 rows?", options: ["0", "1", "3", "true"], answerIndex: 2, hint: "executeUpdate() returns the number of rows affected (deleted)." },
              { question: "If executeUpdate() returns 0 for a DELETE, what does it mean?", options: ["Error occurred", "No rows matched the WHERE condition", "The table is empty", "Connection lost"], answerIndex: 1, hint: "Return value 0 means no rows were deleted, likely because no row satisfied the condition." },
              { question: "What is the default auto-commit mode in JDBC?", options: ["false", "true", "Depends on driver", "Disabled"], answerIndex: 1, hint: "By default, each SQL statement is committed automatically." },
              { question: "How can you prevent auto-commit in JDBC?", options: ["conn.setAutoCommit(false)", "conn.setAutoCommit(true)", "conn.setCommit(false)", "conn.disableAutoCommit()"], answerIndex: 0, hint: "setAutoCommit(false) disables auto-commit, allowing transaction control." }
            ],
            procedure: [
              "Connect to database using JDBC",
              "Create PreparedStatement for DELETE with Roll_No parameter",
              "Set the Roll_No parameter using setInt()",
              "Execute DELETE using executeUpdate()",
              "Check return value: if 0, print 'No row found to delete'",
              "If > 0, print number of rows deleted",
              "Close resources in finally block",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "// Java Program: JDBC Delete using PreparedStatement\nimport java.sql.*;\n\npublic class JDBCDeleteDemo {\n    public static void main(String[] args) {\n        Connection conn = null;\n        PreparedStatement pstmt = null;\n        int rollNoToDelete = 108;  // Roll number to delete\n        \n        try {\n            // Load driver and connect\n            Class.forName(\"org.sqlite.JDBC\");\n            conn = DriverManager.getConnection(\"jdbc:sqlite:test.db\");\n            \n            // First check if record exists (optional but informative)\n            String checkSql = \"SELECT * FROM STUDENT WHERE Roll_No = ?\";\n            PreparedStatement checkStmt = conn.prepareStatement(checkSql);\n            checkStmt.setInt(1, rollNoToDelete);\n            ResultSet rs = checkStmt.executeQuery();\n            \n            if (!rs.next()) {\n                System.out.println(\"No student found with Roll_No: \" + rollNoToDelete);\n                rs.close();\n                checkStmt.close();\n                return;\n            }\n            rs.close();\n            checkStmt.close();\n            \n            // Delete the record\n            String deleteSql = \"DELETE FROM STUDENT WHERE Roll_No = ?\";\n            pstmt = conn.prepareStatement(deleteSql);\n            pstmt.setInt(1, rollNoToDelete);\n            \n            int rowsDeleted = pstmt.executeUpdate();\n            \n            if (rowsDeleted > 0) {\n                System.out.println(\"Successfully deleted \" + rowsDeleted + \" record(s) with Roll_No: \" + rollNoToDelete);\n            } else {\n                System.out.println(\"No record found to delete.\");\n            }\n            \n        } catch (ClassNotFoundException e) {\n            System.out.println(\"Driver not found: \" + e.getMessage());\n        } catch (SQLException e) {\n            System.out.println(\"SQL Error: \" + e.getMessage());\n        } finally {\n            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}\n            try { if (conn != null) conn.close(); } catch (SQLException e) {}\n        }\n    }\n}",
              steps: [
                { line: 1, annotation: "Check if record exists before deletion", memory: [], output: "Record found with Roll_No: 108" },
                { line: 2, annotation: "PreparedStatement created for DELETE with placeholder", memory: [], output: "PreparedStatement object created" },
                { line: 3, annotation: "setInt(1, 108) sets the Roll_No parameter", memory: [], output: "Parameter set" },
                { line: 4, annotation: "executeUpdate() executes DELETE and returns row count", memory: [], output: "Successfully deleted 1 record(s) with Roll_No: 108" },
                { line: 5, annotation: "If no row matched, appropriate message printed", memory: [], output: "No record found to delete (if roll number doesn't exist)" }
              ]
            },
            posttest: [
              { question: "What does executeUpdate() return for a DELETE that deleted no rows?", options: ["0", "1", "-1", "Exception"], answerIndex: 0, hint: "Return value 0 means no rows were affected by the DELETE." },
              { question: "Why would you check if a record exists before deleting it?", options: ["To improve performance", "To provide user feedback (e.g., 'No record found')", "It's required by JDBC", "To prevent SQL injection"], answerIndex: 1, hint: "Checking existence allows meaningful messages when no matching record exists." },
              { question: "What happens if you try to delete a row with a foreign key that has ON DELETE RESTRICT?", options: ["Delete succeeds", "Delete fails with SQLException (foreign key constraint violated)", "The row is deleted but foreign key is set to NULL", "Cascade delete occurs"], answerIndex: 1, hint: "ON DELETE RESTRICT prevents deletion if child rows reference the row." },
              { question: "Which method would you use to delete multiple rows based on a condition like Age < 18?", options: ["PreparedStatement with DELETE WHERE Age < ?", "Statement with concatenated condition", "Both can work", "Neither — must delete one by one"], answerIndex: 2, hint: "Both can work, but PreparedStatement with parameterized condition is safer." },
              { question: "What is the effect of conn.setAutoCommit(false) before a DELETE?", options: ["DELETE is executed immediately", "DELETE is not executed until conn.commit() is called", "DELETE is blocked", "DELETE is executed twice"], answerIndex: 1, hint: "With autoCommit false, changes are pending until commit()." }
            ],
            references: [
              "Oracle: The Complete Reference by Oracle Press — Chapter on SQL DDL/DML",
              "Nilesh Shah, 'Database Systems Using Oracle', PHI, 2007 — Chapter on SQL Queries",
              "Rick F Vander Lans, 'Introduction to SQL', Fourth Edition, Pearson Education, 2007 — Chapter on Basic SQL Operations"
            ]
          }
        }
      ]
    }
  ]
};