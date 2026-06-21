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
    "The Database Management Systems (DBMS) Lab provides a hands-on, browser-based environment where students can write and execute SQL queries, visualize ER diagrams, trace relational algebra expressions, and simulate transaction schedules without requiring any local database installation.",
    "The lab covers structured experiments spanning key database concepts — from basic DDL/DML commands and advanced SQL queries to PL/SQL programming (blocks, loops, cursors, procedures, functions, triggers), indexing, and JDBC database connectivity. Each experiment includes a clear objective, problem statement, theory, pre-loaded SQL starter code, expected output, and self-assessment tests.",
    "Students can attempt all lab problems directly in the browser using a professional SQL editor powered by an in-browser SQLite engine, making the experience identical to working with a full relational database system."
  ],
  targetAudience: {
    primary: "Students of Computer Science and Information Technology enrolled in Database Management Systems (DBMS) lab courses.",
    prerequisites: [
      "Basic knowledge of C or any programming language (loops, conditionals, functions)",
      "Familiarity with basic set theory and mathematical relations",
      "Understanding of file systems and basic data organization concepts"
    ],
    usefulFor: [
      "Students preparing for placements where SQL is a mandatory skill",
      "Students preparing for GATE, where DBMS is a high-weightage subject",
      "Faculty members looking for ready-made experiment references aligned to standard database curricula",
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
              {
                title: "Databases, Tables, and Why We Need Constraints",
                body: [
                  "Storing every student's record in a plain spreadsheet makes it easy for problems to creep in — duplicate roll numbers, unrealistic ages, or students linked to a department that doesn't exist. A relational database prevents this by organizing data into tables and attaching rules called constraints that the data must always satisfy.",
                  "A table is a grid of rows and columns, much like a spreadsheet:",
                  "• Each column has a fixed data type (INT, VARCHAR, DATE) decided when the table is created",
                  "• Each row represents one complete record, such as one student or one department",
                  "![Table Structure with Rows and Columns](/Relational_Model.webp)",
                  "Constraints are rules checked automatically by the database:",
                  "• If an INSERT or UPDATE would break a constraint, the database refuses the operation",
                  "• This guarantees data integrity — the data stored is always accurate and trustworthy"
                ]
              },
              {
                title: "PRIMARY KEY and FOREIGN KEY — Linking Tables Together",
                body: [
                  "A PRIMARY KEY constraint uniquely identifies every row in a table:",
                  "• No two rows can ever share the same primary key value",
                  "• A primary key column can never be NULL (empty)",
                  "• In the STUDENT table, Roll_No is a natural choice since every student already has a unique roll number",
                  "![Primary Key and Foreign Key Relationship](/constraints.webp)",
                  "A FOREIGN KEY is what makes a database 'relational' — it lets one table point to a row in another table:",
                  "• STUDENT's Dept_ID column is a foreign key referencing DEPARTMENT's Dept_ID primary key",
                  "• This guarantees a student can never be linked to a department that doesn't actually exist",
                  "Together, primary and foreign keys let large, repetitive information be split into smaller, connected tables instead of repeating the department name in every student's row."
                ]
              },
              {
                title: "NOT NULL, UNIQUE, and CHECK — Everyday Data Rules",
                body: [
                  "Three common column-level constraints handle everyday data rules:",
                  "• NOT NULL — the column must always contain a value and can never be left blank (e.g., every student needs a Name)",
                  "• UNIQUE — no two rows can share the same value in that column, though one NULL is still allowed (e.g., a student's Email)",
                  "• CHECK — every value placed in the column must satisfy a condition (e.g., CHECK (Age >= 17 AND Age <= 30) stops unrealistic ages)",
                  "All of these work silently in the background: the moment an INSERT or UPDATE runs, the database checks every relevant constraint before the change is allowed to take effect."
                ]
              },
              {
                title: "Changing Table Structure with ALTER TABLE",
                body: [
                  "Once a table already has data, requirements often change — for example, a Phone column wasn't planned originally but is now needed. ALTER TABLE modifies an existing table's structure without recreating it and losing existing data.",
                  "Common ALTER operations:",
                  "• ADD — add a new column",
                  "• RENAME COLUMN — rename an existing column",
                  "• DROP COLUMN — remove a column",
                  "• ADD CONSTRAINT — attach a new constraint to an existing column",
                  "Because ALTER TABLE changes the schema rather than the data inside it, it belongs to the same family of commands as CREATE and DROP — Data Definition Language (DDL)."
                ]
              },
              {
                title: "DROP TABLE, INSERT, and SELECT",
                body: [
                  "DROP TABLE permanently removes a table along with all its data and constraints:",
                  "• There is no undo — it should always be used carefully",
                  "• If other tables have foreign keys referencing it, the CASCADE CONSTRAINTS option removes those dependent constraints too, so the DROP can succeed",
                  "INSERT INTO adds new rows of data to a table — the values listed must match, in order, the data types of the columns defined at creation.",
                  "SELECT reads data back out of a table. Adding a WHERE clause filters the results down to only the rows that satisfy a particular condition — for instance, only students who belong to a specific department."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "What Is a Subquery?",
                body: [
                  "A subquery is a SELECT statement nested inside another SQL statement:",
                  "• It runs first, and its result is used by the outer query — like asking one small question first to help answer a bigger question",
                  "• Example: to find students from departments in 'Hyderabad', first find which Dept_IDs are in Hyderabad, then look up students belonging to those IDs",
                  "![How a Subquery Feeds the Outer Query](/subqueries.webp)",
                  "Subqueries can appear almost anywhere a normal value or table could appear in SQL — most commonly inside a WHERE clause, but also inside a SELECT list or in place of a table in the FROM clause."
                ]
              },
              {
                title: "The IN Operator — Matching Against a List",
                body: [
                  "IN checks whether a value matches any value in a list, including a list produced by a subquery:",
                  "• WHERE Dept_ID IN (SELECT Dept_ID FROM DEPARTMENT WHERE Location='Hyderabad') reads as 'where the department ID is one of the department IDs located in Hyderabad'",
                  "It is one of the most readable ways to filter rows based on data in a related table, without manually typing out the matching ID values."
                ]
              },
              {
                title: "EXISTS and NOT EXISTS — Testing for Presence",
                body: [
                  "EXISTS checks only whether a subquery produces at least one row — not what values it returns:",
                  "• The database can stop searching the moment it finds a single matching row, which often makes EXISTS efficient",
                  "![EXISTS Checking for at Least One Match](sql-exists.webp)",
                  "NOT EXISTS is the opposite — true only when the subquery returns zero rows:",
                  "• A typical use is finding students who have never appeared in the MARKS table at all, meaning they haven't taken any exam yet"
                ]
              },
              {
                title: "ANY and ALL — Comparing Against a Set of Values",
                body: [
                  "ANY and ALL compare a single value against every value produced by a subquery:",
                  "• ANY is true as soon as the condition is satisfied for at least one value — like an OR spread across the list",
                  "• ALL requires the condition to be true for every value — like an AND across the list",
                  "Example: Marks > ANY (subquery) means the student beats at least one value from the subquery, while Marks > ALL (subquery) means the student beats every value in it — effectively better than the entire comparison group."
                ]
              },
              {
                title: "UNION and INTERSECT — Combining Results of Two Queries",
                body: [
                  "UNION and INTERSECT combine the results of two SELECT statements:",
                  "• UNION stacks the rows from both queries into one result and automatically removes duplicates",
                  "• INTERSECT keeps only the rows that appear in both result sets",
                  "![UNION and INTERSECT as Set Operations](/sql-union.webp)",
                  "Both operators require the two queries to be 'union-compatible' — same number of columns, matching order, compatible data types. These operations come directly from the set theory the relational model is built on."
                ]
              },
              {
                title: "Finding the nth Highest Value",
                body: [
                  "A common requirement is finding the student with the 4th highest marks, or the 2nd highest salary in a company.",
                  "• Modern approach: ROW_NUMBER() assigns a unique rank to every row after sorting, then keep the row where rank = 4",
                  "• Older approach (no window functions): for each student, count how many others scored strictly higher; if exactly three scored higher, that student is in 4th rank"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "Aggregate Functions — Summarizing Many Rows into One Value",
                body: [
                  "Aggregate functions condense many rows of data into a single summary value:",
                  "• COUNT(*) — how many rows exist",
                  "• SUM — adds up a numeric column",
                  "• AVG — computes the average",
                  "• MAX / MIN — finds the largest / smallest value",
                  "A detail beginners often miss: aggregate functions ignore NULL values while calculating (except COUNT(*), which counts every row regardless of its contents)."
                ]
              },
              {
                title: "GROUP BY — Aggregating Within Categories",
                body: [
                  "GROUP BY produces one summary per category instead of one overall summary for the whole table — for example, average age per department instead of average age of the whole college.",
                  "• It splits the table into groups based on the values in a chosen column",
                  "• The aggregate function is then applied separately within each group",
                  "![Rows Split into Groups Before Aggregation](/sql-groupby.webp)",
                  "Important rule: every column in the SELECT clause must either appear in the GROUP BY clause or be wrapped inside an aggregate function — otherwise the database wouldn't know which single value to display for a column that isn't grouped or summarized."
                ]
              },
              {
                title: "HAVING — Filtering Groups, Not Rows",
                body: [
                  "WHERE and HAVING filter at different stages:",
                  "• WHERE filters individual rows before any grouping happens",
                  "• HAVING filters the groups themselves, after aggregation — e.g., show only departments with more than one student",
                  "• HAVING runs after GROUP BY and can use aggregate functions in its condition, something WHERE cannot do",
                  "![HAVING](/sql-having.webp)",
                  "Simple rule of thumb: WHERE works on raw, individual rows; HAVING works on already-grouped, summarized results."
                ]
              },
              {
                title: "Views — Saving a Query as a Virtual Table",
                body: [
                  "A view is a saved SELECT query that behaves like a table when queried, but stores no data of its own — its underlying query runs fresh every time the view is used.",
                  "![A View Acting as a Virtual Table](/sql-views.webp)",
                  "Views are useful for:",
                  "• Hiding complexity — query SELECT * FROM Student_Summary instead of repeating a complicated query every time",
                  "• Limiting access — exposing only a controlled subset of the underlying data",
                  "CREATE VIEW defines a new view; DROP VIEW removes only the view's definition — the real base tables and their data are completely unaffected."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "Why We Need Built-in Functions in SQL",
                body: [
                  "Raw data stored in a database is rarely already in the exact shape needed for display or comparison — a date might be stored as a day count, a name might be all lowercase, or a number might need leading zeros.",
                  "SQL ships with a large library of built-in functions that reshape data on the fly, without ever changing what is actually stored inside the table."
                ]
              },
              {
                title: "Conversion Functions — Moving Between Data Types",
                body: [
                  "Three core conversion functions:",
                  "• TO_CHAR — converts a number or date into a readable text string, often with a format like 'DD-MON-YYYY'",
                  "• TO_NUMBER — converts a text string into a real numeric value so it can take part in calculations",
                  "• TO_DATE — converts a text string into a proper date value the database understands",
                  "These matter because SQL is strict about data types — a date stored as plain text generally cannot be compared directly to a real DATE column without first converting one side."
                ]
              },
              {
                title: "String Functions — Reshaping Text",
                body: [
                  "• CONCAT (or ||) — joins two pieces of text together, e.g., combining first and last name",
                  "• UPPER, LOWER, INITCAP — change the lettering case of text, useful for standardizing inconsistently typed data",
                  "• LENGTH — counts how many characters are in a string",
                  "• SUBSTR — pulls out a portion of a string starting at a given position",
                  "• INSTR — searches for the position of one piece of text inside another",
                  "• SUBSTR and INSTR together are exactly how a domain name can be extracted out of an email address",
                  "• LPAD and RPAD — add padding characters to the left/right of a string until it reaches a chosen length, e.g., formatting a roll number to display as '00101' instead of '101'"
                ]
              },
              {
                title: "Date Functions — Working with Calendar Values",
                body: [
                  "• SYSDATE (or DATE('now') in SQLite) — returns the current system date and time, usually the starting point for date calculations",
                  "• MONTHS_BETWEEN — calculates the difference between two dates, e.g., computing age from date of birth",
                  "• ADD_MONTHS — shifts a date forward or backward by a chosen number of months",
                  "• LAST_DAY — finds the final day of the month for a given date",
                  "• ADD_MONTHS and LAST_DAY come up often when calculating due dates, billing cycles, or membership expiry",
                  "• TRUNC and ROUND — adjust a date or number down to a desired level of precision, e.g., trimming a timestamp down to just its date portion"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "The Anatomy of a PL/SQL Block",
                body: [
                  "PL/SQL extends plain SQL with programming constructs — variables, loops, conditional logic — tightly woven into the database itself.",
                  "![The Three Sections of a PL/SQL Block](/plsql_block_structure.webp)",
                  "Every PL/SQL block is organized into up to three sections:",
                  "• DECLARE (optional) — defines the variables and cursors used later",
                  "• BEGIN (mandatory) — holds the actual executable statements",
                  "• EXCEPTION (optional) — catches and handles any errors that occur while BEGIN was running",
                  "• END (mandatory): The END keyword marks the termination of the PL/SQL block. A slash (/) is often used to execute the block in SQL*Plus or Oracle environments."
                ]
              },
              {
                title: "Variables and Cursors — Holding and Stepping Through Data",
                body: [
                  "• A variable holds a single value and is declared with a name and data type, e.g., v_name VARCHAR2(50)",
                  "• A cursor represents an entire set of rows returned by a SELECT query and lets the program step through those rows one at a time",
                  "The typical lifecycle of an explicit cursor:",
                  "• OPEN — start running the query",
                  "• FETCH — pull the next row into variables (repeated)",
                  "• CLOSE — release the resources it was using"
                ]
              },
              {
                title: "Handling Errors with EXCEPTION",
                body: [
                  "Things can go wrong while a block runs — a query might return no rows, or unexpectedly return more rows than expected.",
                  "PL/SQL provides predefined exceptions for common situations:",
                  "• NO_DATA_FOUND — no rows were found",
                  "• TOO_MANY_ROWS — more rows came back than expected",
                  "• WHEN OTHERS — a catch-all for any error not specifically handled elsewhere",
                  "• SQLERRM — a built-in function returning a readable description of whatever error just occurred, useful while debugging"
                ]
              },
              {
                title: "COMMIT, ROLLBACK, and SAVEPOINT — Controlling Transactions",
                body: [
                  "A transaction is a group of database changes that should either all succeed together or all fail together.",
                  "• COMMIT — makes every change made so far in the current transaction permanent and visible to other users",
                  "• ROLLBACK — undoes every change made since the last commit, as though those statements never ran",
                  "• SAVEPOINT — marks a specific point inside a longer transaction, so a later error can roll back only to that point instead of undoing the entire transaction"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "IF-THEN-ELSE — Making Decisions in Code",
                body: [
                  "IF-THEN-ELSE lets a PL/SQL block choose between different actions depending on whether a condition is true or false:",
                  "• IF — checks a condition and runs its statements only when true",
                  "• ELSIF — checks additional conditions one after another",
                  "• ELSE — catches everything that didn't match any earlier condition"
                ]
              },
              {
                title: "Nested IF — Checking Multiple Conditions in Layers",
                body: [
                  "![Decision Tree for a Nested IF](/nested_if_decision.webp)",
                  "A nested IF places one IF statement inside another — useful whenever a decision depends on more than one independent question.",
                  "• Assigning a letter grade from marks is a classic example: check whether marks are 90+ first, and only if that fails, move to the next threshold, and so on",
                  "• Like walking down a staircase of conditions until exactly one matches"
                ]
              },
              {
                title: "CASE Expressions — A Cleaner Alternative to Long IF Chains",
                body: [
                  "A CASE expression achieves the same multi-branch logic as a chain of nested IF statements, but in a far more compact and readable form — similar to a switch statement in other languages.",
                  "• It evaluates one expression against several possible values (or conditions) and returns whichever result matches",
                  "• CASE is also handy directly inside an ordinary SQL query — e.g., converting a single-letter grade column into a full word description right inside a SELECT, with no separate PL/SQL block needed"
                ]
              },
              {
                title: "NULLIF and COALESCE — Gracefully Handling Missing Data",
                body: [
                  "NULL represents missing or unknown data and behaves differently from zero or an empty string — dividing by NULL, or comparing anything to NULL, never produces a normal true or false result.",
                  "• NULLIF(a, b) — returns NULL whenever the two values are equal; commonly used to avoid a 'division by zero' error by turning a zero denominator into NULL",
                  "• COALESCE(a, b, c, ...) — scans its arguments left to right and returns the first one that isn't NULL; perfect for supplying a sensible default, e.g., showing 0 instead of a blank when a student hasn't taken any exam"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "WHILE Loop — Repeating While a Condition Holds",
                body: [
                  "![WHILE Loop](/sql-while.webp)",
                  "A WHILE loop checks its condition before every iteration and keeps repeating its body for as long as that condition stays true:",
                  "• The moment the condition becomes false, the loop stops immediately",
                  "• Right choice whenever the exact number of repetitions isn't known in advance"
                ]
              },
              {
                title: "Numeric FOR Loop — Repeating a Known Number of Times",
                body: [
                  "![FOR Loop](/sql-for.webp)",
                  "A numeric FOR loop is the right tool when the exact range to repeat over is already known, such as counting from 1 to 10.",
                  "• PL/SQL automatically creates and increments the loop counter — no need to remember to manually increase it, a common bug with WHILE loops",
                  "• Adding REVERSE walks the same range backward"
                ]
              },
              {
                title: "Nested Loops — Loops Inside Loops",
                body: [
                  "A nested loop places one loop entirely inside the body of another:",
                  "• The outer loop controls the bigger, slower-moving iteration (e.g., once per student)",
                  "• The inner loop handles a smaller, faster-moving iteration that depends on the outer one (e.g., once per course that student took)",
                  "• For every pass of the outer loop, the entire inner loop runs from start to finish before the outer loop moves on"
                ]
              },
              {
                title: "Built-in Exceptions — Errors the Database Already Knows About",
                body: [
                  "PL/SQL ships with predefined exceptions for common, predictable problems:",
                  "• ZERO_DIVIDE — fires automatically when code attempts to divide a number by zero",
                  "• INVALID_NUMBER — fires when non-numeric text is used somewhere a number was expected",
                  "• PL/SQL raises these automatically — no need to manually detect the situation"
                ]
              },
              {
                title: "User-Defined Exceptions and RAISE_APPLICATION_ERROR",
                body: [
                  "Sometimes a situation is invalid purely from a business standpoint, even though it's valid SQL — negative marks, for instance.",
                  "• A named exception can be declared, optionally tied to a specific error number using PRAGMA EXCEPTION_INIT, and RAISE'd the moment that business rule is broken",
                  "• RAISE_APPLICATION_ERROR immediately stops execution and returns a custom, human-readable error message with an error number — reserved range -20000 to -20999 — back to the caller"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "What Is a Stored Procedure?",
                body: [
                  "![Calling a Stored Procedure](/procedure_call_flow.webp)",
                  "A stored procedure is a named, reusable block of PL/SQL code saved inside the database itself, rather than rewritten every time the same task is needed.",
                  "• Once created, it can be called by name from any other PL/SQL block or application — similar to calling a function in an ordinary programming language"
                ]
              },
              {
                title: "Parameter Modes — IN, OUT, and IN OUT",
                body: [
                  "Parameters let data pass into and out of a procedure:",
                  "• IN (the default) — only carries a value into the procedure; the procedure may read it but cannot change what the caller sees afterward",
                  "• OUT — starts out empty; the procedure uses it purely to send a computed result back to the caller",
                  "• IN OUT — combines both: the procedure receives an initial value and may modify it, with the new value reflected back to the caller"
                ]
              },
              {
                title: "Calling a Procedure",
                body: [
                  "Inside a PL/SQL block, a procedure is invoked by writing its name followed by arguments in parentheses, matching the order of the parameter list it was created with.",
                  "• Any variable passed into an OUT parameter slot automatically receives whatever value the procedure assigns to it",
                  "• Splitting logic into well-named procedures (e.g., GetStudentMarks, UpdateStudentAge) makes large applications easier to read, test, and reuse, since logic never needs to be duplicated"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "What Is a Stored Function?",
                body: [
                  "![Function Returns a Value, Procedure Performs an Action](/function_vs_procedure.webp)",
                  "A stored function is similar to a stored procedure — both are named, reusable blocks of PL/SQL code — but a function is specifically designed to compute and RETURN a single value back to its caller.",
                  "• This RETURN value is exactly what makes a function usable directly inside ordinary SQL statements, not just inside PL/SQL blocks"
                ]
              },
              {
                title: "Function vs Procedure — Knowing Which One to Use",
                body: [
                  "The clearest distinction:",
                  "• A function must always RETURN a value and is meant for computing something, like an average or a grade",
                  "• A procedure is meant for performing an action, like updating a row, and does not have to return anything",
                  "• Because of this, functions can be used inside a SELECT list or WHERE clause, while procedures generally cannot"
                ]
              },
              {
                title: "Calling Functions Inside SQL Statements",
                body: [
                  "Once a function like GetGrade(marks) is created, it can be used exactly like a built-in SQL function — e.g., SELECT Name, GetGrade(Marks) FROM ... computes the grade for every row directly inside the query.",
                  "• This pushes reusable business logic into the database itself, instead of repeating the same calculation in every application that queries the data",
                  "• To be safely called from SQL, a function generally needs to be deterministic (same input → same output) and should not contain OUT parameters, since SQL expects a single returned value per call"
                ]
              },
              {
                title: "Writing More Complex Functions",
                body: [
                  "Functions aren't limited to a single, simple calculation — they can contain their own variables, IF statements, loops, and even queries against other tables, exactly like a procedure can.",
                  "• Example: a function computing a student's class rank might query the MARKS table, count how many students scored higher, and return that count plus one as the final rank"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "Recap — What Is a Cursor?",
                body: [
                  "![The OPEN, FETCH, CLOSE Lifecycle of a Cursor](/cursor_lifecycle.webp)",
                  "A cursor is a pointer to the result set of a SELECT query, letting a PL/SQL program process its rows one at a time instead of all at once.",
                  "• A basic cursor is permanently fixed to one specific query the moment it's declared — fine for simple cases, but limiting for more flexible programs"
                ]
              },
              {
                title: "Parameterized Cursors — Reusing the Same Cursor with Different Values",
                body: [
                  "A parameterized cursor accepts one or more parameters at declaration time, much like a procedure accepts its own parameters.",
                  "• The actual value is supplied only when the cursor is OPENed",
                  "• The same cursor definition can be reused — first to fetch students from Department 1, then reopened for Department 2 — without ever writing the underlying query twice"
                ]
              },
              {
                title: "FOR UPDATE and WHERE CURRENT OF — Safely Modifying What You Just Fetched",
                body: [
                  "• FOR UPDATE — locks the rows a cursor's SELECT retrieves, preventing other transactions from changing those same rows until the current transaction finishes, avoiding two processes updating the same row at once",
                  "• WHERE CURRENT OF — lets an UPDATE or DELETE target exactly the row the cursor most recently fetched, without repeating the WHERE condition or relying on a primary key — the cursor already remembers which row it's positioned on"
                ]
              },
              {
                title: "Cursor Variables (REF CURSOR) — Cursors That Aren't Tied to One Query",
                body: [
                  "A normal cursor is permanently associated with one fixed SELECT statement written at declaration time.",
                  "• A cursor variable, declared with the REF CURSOR type, behaves like a flexible pointer that can be opened against any query decided only at runtime",
                  "• Useful when the exact query to run depends on a condition only known while the program is executing — e.g., deciding which of two SELECT statements to open based on a department ID known only at runtime"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "What Is a Trigger?",
                body: [
                  "![Different Kinds of Triggers Around a DML Statement](/trigger_types.webp)",
                  "A trigger is a special block of PL/SQL code the database runs automatically in response to a specific event — typically an INSERT, UPDATE, or DELETE on a table — without anyone explicitly calling it.",
                  "• Useful for enforcing rules, automatically logging changes, or keeping related data in sync without relying on every application to remember to do it manually"
                ]
              },
              {
                title: "BEFORE vs AFTER — Timing of a Trigger",
                body: [
                  "• BEFORE trigger — runs just before the triggering DML statement changes the data; the right place to validate or modify incoming data, e.g., rejecting an INSERT if age is out of range",
                  "• AFTER trigger — runs once the change has already been made; the natural place for tasks like writing an audit log entry, since by then the change is known to have succeeded"
                ]
              },
              {
                title: "ROW vs STATEMENT — How Many Times a Trigger Fires",
                body: [
                  "• ROW-level trigger (FOR EACH ROW) — fires once for every individual row affected; an UPDATE changing 50 rows runs it 50 separate times",
                  "• STATEMENT-level trigger — fires exactly once for the entire statement, regardless of rows touched; appropriate for tasks like recording that 'a bulk update happened' without caring about each row"
                ]
              },
              {
                title: ":OLD and :NEW — Looking at Data Before and After the Change",
                body: [
                  "Inside a row-level trigger, the pseudo-records :OLD and :NEW give access to column values before and after the change:",
                  "• INSERT — :OLD is empty (no previous row); :NEW holds the values being inserted",
                  "• DELETE — :NEW is empty; :OLD holds the values about to be removed",
                  "• UPDATE — both are available at once, letting a trigger compare exactly what changed"
                ]
              },
              {
                title: "INSTEAD OF Triggers — Making Views Updatable",
                body: [
                  "Normally, a view built from a JOIN of multiple tables cannot be directly inserted into, updated, or deleted from, because the database can't tell which underlying table each column belongs to.",
                  "• An INSTEAD OF trigger replaces the DML operation on the view with custom logic specified by the trigger's author",
                  "• Typically performs the equivalent inserts or updates on the real, underlying base tables instead"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "Searching Without an Index — The Full Table Scan",
                body: [
                  "When a table has no index on the searched column, the database has no shortcut — it must check every single row one after another.",
                  "• This is called a full table scan",
                  "• Its cost grows directly with the number of rows — doubling the table size roughly doubles search time"
                ]
              },
              {
                title: "What Is an Index?",
                body: [
                  "An index is an extra, separate data structure the database maintains alongside a table, built specifically to make searching a particular column much faster.",
                  "• Conceptually similar to the index at the back of a textbook — jump straight to the right page instead of reading the entire book",
                  "![A B-Tree Index Sitting Alongside a Table](/btree_index_structure.webp)",
                  "• Most database indexes are built using a B-Tree (or a close variant) — the same balanced tree structure from data structures courses — which keeps tree height small even for very large tables, guaranteeing fast lookups"
                ]
              },
              {
                title: "How an Indexed Search Works",
                body: [
                  "With an index in place, the database no longer checks every row:",
                  "• It walks down the index's tree structure, making only a small number of comparisons at each level",
                  "• It arrives directly at the matching row(s)",
                  "• This brings search time from being proportional to the total row count down to being proportional to the logarithm of the row count — a dramatic improvement on large tables"
                ]
              },
              {
                title: "Reading an Execution Plan",
                body: [
                  "EXPLAIN QUERY PLAN shows exactly how the database intends to execute a query, without actually running it:",
                  "• 'SCAN TABLE' — the database will read every row (a full table scan)",
                  "• 'SEARCH TABLE ... USING INDEX' — the database found and used an index, avoiding a full scan"
                ]
              },
              {
                title: "When (and When Not) to Create an Index",
                body: [
                  "Indexes are most valuable on columns frequently used in WHERE clauses, JOIN conditions, or ORDER BY, especially on large tables.",
                  "• Indexes aren't free — every index must be updated on every INSERT, UPDATE, or DELETE, adding overhead and using extra disk space",
                  "• Indexing a column with very few distinct values (e.g., 'Gender' with only two values) usually doesn't help much, since the index still points to a large fraction of the table for any given value"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "What Is JDBC?",
                body: [
                  "![How JDBC Sits Between Java and the Database](/jdbc_architecture.webp)",
                  "JDBC (Java Database Connectivity) is a standard Java API that lets a Java program talk to a relational database, regardless of which specific database product is used.",
                  "• A program can usually switch from one database (e.g., SQLite) to a different one (e.g., MySQL) just by changing the driver and connection details, without rewriting query logic"
                ]
              },
              {
                title: "JDBC Drivers — The Translator Between Java and the Database",
                body: [
                  "A JDBC driver is the software that knows how to communicate with a specific database's native protocol.",
                  "• Modern drivers are almost always 'Type 4' — written entirely in Java, talking directly to the database over the network with no extra native libraries needed",
                  "• Every database has its own connection URL format, e.g., jdbc:sqlite:test.db for local SQLite, or jdbc:mysql://host:port/database for a remote MySQL server"
                ]
              },
              {
                title: "The Five Steps of a Typical JDBC Program",
                body: [
                  "• Step 1 — Load the driver class using Class.forName(), registering it with the JDBC DriverManager",
                  "• Step 2 — Open a connection using DriverManager.getConnection(url), returning a Connection object",
                  "• Step 3 — Run queries through a Statement or PreparedStatement",
                  "• Step 4 — Process results, typically through a ResultSet object",
                  "• Step 5 — Always close the connection (and any statements/result sets) once finished, to release resources"
                ]
              },
              {
                title: "Database Metadata — Asking the Database About Itself",
                body: [
                  "Calling getMetaData() on the Connection object returns a DatabaseMetaData object, which answers questions about the database itself rather than any particular table — product name, version number, driver version, connection URL.",
                  "• Particularly useful for diagnostic code or tools that need to behave slightly differently depending on which database they're connected to"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "Statement vs PreparedStatement",
                body: [
                  "A plain Statement executes a fixed, complete SQL string exactly as written. If part of that string is built by directly concatenating user input, an attacker could craft input that changes the query's meaning entirely — the basis of a SQL injection attack.",
                  "![Values Flowing Safely into a Parameterized Query](/preparedstatement_flow.webp)",
                  "A PreparedStatement instead uses a SQL template with placeholder question marks (?) wherever a value will go:",
                  "• Actual values are supplied afterward using methods like setInt() and setString()",
                  "• The database driver ensures these values are always treated strictly as data, never as part of the SQL command itself"
                ]
              },
              {
                title: "Why PreparedStatement Prevents SQL Injection",
                body: [
                  "Because the SQL text and the actual values are sent to the database separately when using a PreparedStatement, there's no way for a crafted value (e.g., a name containing extra SQL syntax) to alter the query's structure.",
                  "• This is exactly why PreparedStatement is the standard, safe way to handle any value originating from outside the program, such as user input"
                ]
              },
              {
                title: "Performing an INSERT with executeUpdate()",
                body: [
                  "executeUpdate() is the JDBC method used for any SQL statement that changes data rather than retrieving it — covers INSERT, UPDATE, DELETE.",
                  "• It returns an integer telling exactly how many rows were affected, which a program can check to confirm the operation worked as expected",
                  "• Good practice: query the table again immediately after an INSERT to verify the data was stored correctly"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              {
                title: "Deleting Rows Safely with PreparedStatement",
                body: [
                  "Deleting data follows the same safe pattern used for inserting it: write the DELETE statement with a placeholder for the value identifying which row to remove (typically a primary key like Roll_No), then bind the actual value before executing.",
                ]
              },
              {
                title: "Checking Whether a Row Actually Existed",
                body: [
                  "A DELETE statement running without error doesn't necessarily mean it removed anything — if the WHERE condition matches no row, the statement still succeeds but affects zero rows.",
                  "• Check the integer returned by executeUpdate(): 0 means no matching row was found; any positive number tells exactly how many rows were removed",
                  "• Some programs run a SELECT check before the DELETE, purely to show a clearer message such as 'No student found with that roll number' instead of a generic zero-rows-affected result"
                ]
              },
              {
                title: "Transactions and DELETE",
                body: [
                  "By default, most JDBC connections operate in auto-commit mode — every individual statement, including a DELETE, is committed immediately after it runs, with no way to undo it afterward.",
                  "• For a delete that should remain reversible until a whole sequence of operations succeeds, a program can turn off auto-commit, perform several related changes, and call commit() only once everything succeeds (or rollback() if something fails partway through)"
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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