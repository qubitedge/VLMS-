// lib/dbms-data.ts

import { Course } from './course-data';

export const dbmsCourse: Course = {
  id: "dbms",
  title: "Database Management Systems Lab",
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
    "The lab covers 14 weeks of structured experiments aligned with the JNTUGV DBMS syllabus — from ER modelling and relational algebra to SQL, normalization, and transaction management. Each experiment includes a clear objective, problem statement, theory, pre-loaded SQL starter code, expected output, and self-assessment tests.",
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
    totalExperiments: "38 problems across 14 weeks",
    compiler: "SQLite (in-browser) — compatible with standard SQL used in JNTUGV physical labs",
    units: [
      { unit: "Unit I", topics: "Introduction to DBMS, ER Model, Schema, Three-tier Architecture", weeks: "Week 1–2" },
      { unit: "Unit II", topics: "Relational Model, Relational Algebra, Relational Calculus, Basic SQL (DDL, DML)", weeks: "Week 3–5" },
      { unit: "Unit III", topics: "Advanced SQL — Queries, Functions, Joins, Views, Nested Queries", weeks: "Week 6–9" },
      { unit: "Unit IV", topics: "Schema Refinement — Functional Dependencies, Normal Forms (1NF–5NF), BCNF", weeks: "Week 10–11" },
      { unit: "Unit V", topics: "Transactions, ACID, Concurrency Control, Indexing — B+ Trees, Hashing", weeks: "Week 12–14" }
    ]
  },
  weeks : [
    {
      title: "WEEK 1",
      objective: "Introduction to DBMS concepts and ER modelling",
      tutorial: "Tutorial 1: Database Concepts and ER Diagrams",
      labTitle: "Lab 1: ER Diagram Design",
      "experiments": [
        {
          id: "db-w1-1",
          "title": "ER Diagram — University Database",
          "desc": "Design an ER diagram for a university database with entities: Student, Course, Instructor, Department, and appropriate relationships.",
          "expected": "ER diagram with correct entities, attributes, relationships, and cardinality constraints",
          "content": {
            "aim": {
              "text": "In this experiment, the student will design an Entity-Relationship (ER) diagram for a university database system. The student will:",
              "bullets": [
                "Identify entities and their attributes in a real-world problem",
                "Classify attributes as simple, composite, multivalued, or derived",
                "Identify relationships between entities and determine their cardinality ratios (1:1, 1:N, M:N)",
                "Identify primary keys for each entity",
                "Represent participation constraints (total vs. partial) in the ER diagram"
              ]
            },
            "theory": [
              {
                "title": "What is an Entity?",
                "body": [
                  "An entity is a real-world object or concept that has an independent existence and about which data is stored.",
                  "Entities are represented as rectangles in an ER diagram. Examples: Student, Course, Instructor, Department.",
                  "An entity set is a collection of entities of the same type sharing the same properties."
                ]
              },
              {
                "title": "Attributes",
                "body": [
                  "An attribute is a property that describes an entity. Types of attributes:",
                  "Simple attribute: Cannot be divided further. Example: Age, Roll_No.",
                  "Composite attribute: Can be divided into sub-parts. Example: Name = {First_Name, Last_Name}.",
                  "Multivalued attribute: Can have multiple values. Example: Phone_Numbers. Represented with double ellipse.",
                  "Derived attribute: Computed from other attributes. Example: Age derived from Date_of_Birth. Represented with dashed ellipse."
                ]
              },
              {
                "title": "Relationships and Cardinality",
                "body": [
                  "A relationship is an association among two or more entities. Represented as a diamond in ER diagrams.",
                  "Cardinality ratios define how many entity instances can participate in a relationship:",
                  "1:1 (One-to-One): One entity instance is associated with at most one instance of another entity.",
                  "1:N (One-to-Many): One entity instance is associated with multiple instances of another.",
                  "M:N (Many-to-Many): Multiple instances on both sides. Example: Student ENROLLS IN Course."
                ]
              },
              {
                "title": "Participation Constraints",
                "body": [
                  "Total participation (double line): Every entity in the set must participate in the relationship. Example: Every Department must have a Head.",
                  "Partial participation (single line): Some entities may not participate. Example: Not every Instructor advises students."
                ]
              },
              {
                "title": "Keys",
                "body": [
                  "A key is an attribute (or set of attributes) that uniquely identifies each entity instance.",
                  "Primary key attributes are underlined in ER diagrams.",
                  "Example: Roll_No uniquely identifies a Student; Course_ID uniquely identifies a Course."
                ]
              }
            ],
            "pretest": [
              { "question": "Which shape represents an entity in an ER diagram?", "options": ["Diamond", "Ellipse", "Rectangle", "Line"], "answerIndex": 2 },
              { "question": "Which shape represents a relationship in an ER diagram?", "options": ["Rectangle", "Diamond", "Ellipse", "Arrow"], "answerIndex": 1 },
              { "question": "A multivalued attribute is represented in ER diagrams as:", "options": ["Dashed ellipse", "Double ellipse", "Rectangle", "Diamond"], "answerIndex": 1 },
              { "question": "What cardinality does STUDENT ENROLLS IN COURSE have?", "options": ["1:1", "1:N", "M:N", "N:1"], "answerIndex": 2 },
              { "question": "Total participation in a relationship is shown by:", "options": ["Single line", "Dashed line", "Double line", "Arrow"], "answerIndex": 2 }
            ],
            "procedure": [
              "Read the Aim and Theory sections carefully before designing the diagram",
              "Identify all entities in the university scenario: Student, Course, Instructor, Department",
              "List attributes for each entity — identify primary keys, composite, multivalued, and derived attributes",
              "Identify relationships: ENROLLS (Student-Course), TEACHES (Instructor-Course), BELONGS_TO (Student-Department), MANAGES (Instructor-Department)",
              "Determine cardinality for each relationship",
              "Determine participation constraints (total or partial) for each entity in each relationship",
              "Draw the ER diagram using the Simulation tab's interactive ER editor",
              "Verify your diagram using the checklist: every entity has a key, every relationship has a cardinality label",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- ER Diagram Design (no SQL — use the interactive ER canvas in this tab)\n-- Entities: Student(Roll_No*, Name, DOB, Phone{multi})\n--           Course(Course_ID*, Title, Credits)\n--           Instructor(Emp_ID*, Name, Qualification)\n--           Department(Dept_ID*, Dept_Name, Location)\n-- Relationships:\n--   ENROLLS (Student M:N Course) — Grade attribute on relationship\n--   TEACHES (Instructor 1:N Course)\n--   BELONGS_TO (Student N:1 Department) — total on Student side\n--   MANAGES (Instructor 1:1 Department) — total on Department side",
              "steps": [
                { "line": 1, "annotation": "Identify Student entity with Roll_No as primary key", "memory": [], "output": "Entity: Student — Roll_No (PK), Name (composite), DOB, Phone (multivalued)" },
                { "line": 2, "annotation": "Identify Course entity with Course_ID as primary key", "memory": [], "output": "Entity: Course — Course_ID (PK), Title, Credits" },
                { "line": 3, "annotation": "Identify Instructor entity", "memory": [], "output": "Entity: Instructor — Emp_ID (PK), Name, Qualification" },
                { "line": 4, "annotation": "Identify Department entity", "memory": [], "output": "Entity: Department — Dept_ID (PK), Dept_Name, Location" },
                { "line": 5, "annotation": "Define ENROLLS relationship — M:N with Grade as relationship attribute", "memory": [], "output": "Relationship: ENROLLS — Student (partial) M:N Course (partial) — Attribute: Grade" },
                { "line": 6, "annotation": "Define TEACHES relationship — 1:N", "memory": [], "output": "Relationship: TEACHES — Instructor (partial) 1:N Course (total)" },
                { "line": 7, "annotation": "Define BELONGS_TO relationship — N:1, total on Student", "memory": [], "output": "Relationship: BELONGS_TO — Student (total) N:1 Department (partial)" },
                { "line": 8, "annotation": "Define MANAGES relationship — 1:1, total on Department", "memory": [], "output": "Relationship: MANAGES — Instructor (partial) 1:1 Department (total)" }
              ]
            },
            "posttest": [
              { "question": "In the ENROLLS relationship between Student and Course, the cardinality is:", "options": ["1:1", "1:N", "M:N", "N:1"], "answerIndex": 2 },
              { "question": "If every course must be taught by at least one instructor, the participation of Course in TEACHES is:", "options": ["Partial", "Total", "Optional", "Recursive"], "answerIndex": 1 },
              { "question": "An attribute like 'Age' computed from 'Date_of_Birth' is called a:", "options": ["Simple attribute", "Multivalued attribute", "Derived attribute", "Composite attribute"], "answerIndex": 2 },
              { "question": "Which of the following is a relationship attribute in the university ER diagram?", "options": ["Roll_No", "Course_ID", "Grade", "Dept_Name"], "answerIndex": 2 },
              { "question": "In ER notation, the primary key attribute is represented by:", "options": ["Bold text", "Italic text", "Underlined text", "Double ellipse"], "answerIndex": 2 }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 1: Introduction (Sections 1.1-1.3)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 3: Data Modeling Using the Entity-Relationship Model (Sections 3.1-3.9)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 2: Entity-Relationship Modeling (Sections 2.1-2.5)",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 13: ER Modeling",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 4: Entity Relationship (ER) Modeling"
              ]
          }
        },
        {
          "id": "db-w1-2",
          "title": "ER Diagram — Hospital Database",
          "desc": "Design an ER diagram for a hospital database with entities: Patient, Doctor, Ward, Medicine, and Treatment.",
          "expected": "ER diagram with correct entities, relationships including TREATED_BY (Patient-Doctor, M:N), ADMITTED_IN (Patient-Ward, M:1), PRESCRIBES (Doctor-Medicine, M:N with dosage attribute)",
          "content": {
            "aim": {
              "text": "In this experiment, the student will design an ER diagram for a hospital management system. The student will:",
              "bullets": [
                "Identify and model entities specific to a hospital domain",
                "Model ternary relationships where appropriate",
                "Identify weak entities if any exist in the hospital domain",
                "Apply specialization / generalization (e.g., Doctor specializes into Surgeon, General Physician)",
                "Represent attributes on relationships (e.g., Dosage on PRESCRIBES)"
              ]
            },
            "theory": [
              {
                "title": "Weak Entities",
                "body": [
                  "A weak entity is one that cannot be uniquely identified by its own attributes alone. It depends on a strong (owner) entity for its existence.",
                  "Weak entities are represented with a double rectangle. The relationship connecting a weak entity to its owner is called an identifying relationship, shown as a double diamond.",
                  "Example: A Ward_Bed may be identified only by Bed_Number within a specific Ward — making it a weak entity dependent on Ward."
                ]
              },
              {
                "title": "Specialization and Generalization",
                "body": [
                  "Specialization is a top-down process where a general entity (superclass) is divided into more specific subclasses. Example: Person → Doctor, Patient.",
                  "Generalization is the reverse bottom-up process — combining common attributes of multiple entities into a higher-level entity.",
                  "Inheritance: Subclasses inherit all attributes of the superclass and may have additional specific attributes.",
                  "Represented using an ISA triangle in ER diagrams."
                ]
              },
              {
                "title": "Ternary Relationships",
                "body": [
                  "A ternary relationship involves three entity sets simultaneously. Example: Doctor PRESCRIBES Medicine to Patient — this cannot be accurately split into two binary relationships without losing information.",
                  "Represented as a single diamond connected to three entity rectangles."
                ]
              }
            ],
            "pretest": [
              { "question": "A weak entity is represented in ER diagrams as:", "options": ["Single rectangle", "Double rectangle", "Dashed rectangle", "Diamond"], "answerIndex": 1 },
              { "question": "The relationship between a weak entity and its owner is called:", "options": ["Strong relationship", "Identifying relationship", "Partial relationship", "Recursive relationship"], "answerIndex": 1 },
              { "question": "Which of the following demonstrates specialization?", "options": ["Student and Course merged into Person", "Doctor split into Surgeon and General Physician", "Patient linked to Ward", "Medicine linked to Doctor"], "answerIndex": 1 },
              { "question": "A ternary relationship connects how many entity sets?", "options": ["2", "3", "4", "1"], "answerIndex": 1 },
              { "question": "Subclasses in specialization inherit attributes from the:", "options": ["Weak entity", "Superclass", "Relationship", "Key attribute"], "answerIndex": 1 }
            ],
            "procedure": [
              "Read Aim and Theory before starting",
              "Identify entities: Patient, Doctor, Ward, Medicine. Identify if Bed is a weak entity of Ward",
              "Apply specialization: Doctor → Surgeon, General Physician, Specialist",
              "Identify relationships: TREATED_BY (Patient M:N Doctor), ADMITTED_IN (Patient N:1 Ward), PRESCRIBES (Doctor M:N Medicine with Dosage and Frequency as relationship attributes)",
              "Represent the ternary PRESCRIBES relationship connecting Doctor, Medicine, and Patient",
              "Draw the ER diagram on the Simulation ER canvas",
              "Verify: all entities have primary keys, weak entity has partial key, ISA hierarchy is correct",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Hospital ER Design\n-- Strong Entities: Patient(P_ID*, Name, Age, Blood_Group)\n--                  Doctor(D_ID*, Name, Specialization, Phone)\n--                  Ward(Ward_No*, Ward_Name, Capacity)\n--                  Medicine(Med_ID*, Med_Name, Manufacturer)\n-- Weak Entity: Bed(Bed_No, Ward_No) — depends on Ward\n-- Specialization: Doctor ISA {Surgeon, GeneralPhysician, Specialist}\n-- Relationships:\n--   TREATED_BY (Patient M:N Doctor)\n--   ADMITTED_IN (Patient N:1 Ward, total on Patient)\n--   PRESCRIBES (Doctor M:N Medicine) — Dosage, Frequency as attributes",
              "steps": [
                { "line": 1, "annotation": "Model Patient as strong entity", "memory": [], "output": "Entity: Patient — P_ID (PK), Name, Age, Blood_Group" },
                { "line": 2, "annotation": "Model Doctor as strong entity with specialization", "memory": [], "output": "Entity: Doctor — D_ID (PK), Name, Specialization / ISA: Surgeon, GeneralPhysician" },
                { "line": 3, "annotation": "Model Ward as strong entity, Bed as weak entity", "memory": [], "output": "Entity: Ward — Ward_No (PK); Weak Entity: Bed — Bed_No (partial key)" },
                { "line": 4, "annotation": "Model TREATED_BY as M:N relationship", "memory": [], "output": "Relationship: TREATED_BY — Patient M:N Doctor" },
                { "line": 5, "annotation": "Model PRESCRIBES with relationship attributes", "memory": [], "output": "Relationship: PRESCRIBES — Doctor M:N Medicine; Attributes: Dosage, Frequency" }
              ]
            },
            "posttest": [
              { "question": "What identifies a Bed in the hospital database (weak entity)?", "options": ["Bed_No alone", "Ward_No alone", "Combination of Bed_No and Ward_No", "Patient_ID"], "answerIndex": 2 },
              { "question": "The partial key of a weak entity is shown in ER diagrams as:", "options": ["Underlined", "Double underlined", "Dashed underline", "Bold"], "answerIndex": 2 },
              { "question": "In specialization, which entity has more attributes — superclass or subclass?", "options": ["Superclass always has more", "Subclass always has more", "Superclass has common attributes; subclass adds specific ones", "Both have exactly the same"], "answerIndex": 2 },
              { "question": "Dosage placed on the PRESCRIBES relationship is an example of:", "options": ["Entity attribute", "Relationship attribute", "Derived attribute", "Multivalued attribute"], "answerIndex": 1 },
              { "question": "The ISA triangle in ER diagrams represents:", "options": ["A recursive relationship", "Specialization or generalization", "A ternary relationship", "Participation constraint"], "answerIndex": 1 }
            ],
            references: [
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 2: Entity-Relationship Modeling (Sections 2.6-2.8 on Specialization, Weak Entities)",
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 1: Introduction (Section 1.4 on Data Models)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 4: Enhanced Entity-Relationship (EER) Modeling",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 14: Enhanced ER Modeling",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 4: Advanced ER Modeling"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 2",
      "objective": "Relational Model — Relational Algebra and Relational Calculus",
      "tutorial": "Tutorial 2: Relational Algebra Operations",
      "labTitle": "Lab 2: Relational Algebra Expressions",
      "experiments": [
        {
          "id": "db-w2-1",
          "title": "Basic Relational Algebra — Select and Project",
          "desc": "Given relations EMPLOYEE(Emp_ID, Name, Dept, Salary) and DEPARTMENT(Dept_ID, Dept_Name, Manager_ID), write relational algebra expressions for: (a) Select employees with Salary > 50000, (b) Project only Name and Dept from EMPLOYEE, (c) Find employees who work in 'HR' department.",
          "expected": "Correct relational algebra expressions with intermediate results shown",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply fundamental relational algebra operations to query relational tables. The student will:",
              "bullets": [
                "Apply the SELECT operation (σ) to filter tuples based on a condition",
                "Apply the PROJECT operation (π) to extract specific attributes",
                "Combine SELECT and PROJECT to answer compound queries",
                "Understand the concept of a relation as a set of tuples and how operations produce new relations"
              ]
            },
            "theory": [
              {
                "title": "Relational Algebra Overview",
                "body": [
                  "Relational algebra is a procedural query language that takes one or more relations as input and produces a new relation as output.",
                  "It is the theoretical foundation for SQL and all relational query processing.",
                  "Fundamental operations: SELECT (σ), PROJECT (π), UNION (∪), SET DIFFERENCE (−), CARTESIAN PRODUCT (×), RENAME (ρ).",
                  "Derived operations: JOIN (⋈), INTERSECTION (∩), DIVISION (÷)."
                ]
              },
              {
                "title": "SELECT Operation (σ)",
                "body": [
                  "Syntax: σ_condition(Relation)",
                  "Selects tuples that satisfy the given condition. The result has the same attributes as the input relation.",
                  "Example: σ_Salary>50000(EMPLOYEE) — returns all tuples where Salary > 50000.",
                  "Conditions can use: =, ≠, <, >, ≤, ≥, AND (∧), OR (∨), NOT (¬)."
                ]
              },
              {
                "title": "PROJECT Operation (π)",
                "body": [
                  "Syntax: π_attr1,attr2,...(Relation)",
                  "Extracts specified attributes (columns) from the relation. Duplicate tuples in the result are eliminated (relations are sets).",
                  "Example: π_Name,Dept(EMPLOYEE) — returns a relation with only Name and Dept columns."
                ]
              },
              {
                "title": "Combining Operations",
                "body": [
                  "Relational algebra expressions can be nested. The result of one operation feeds as input to the next.",
                  "Example: π_Name(σ_Dept='HR'(EMPLOYEE)) — first selects employees in HR, then projects only their names."
                ]
              }
            ],
            "pretest": [
              { "question": "Which relational algebra operation filters rows based on a condition?", "options": ["PROJECT (π)", "SELECT (σ)", "JOIN (⋈)", "UNION (∪)"], "answerIndex": 1 },
              { "question": "Which operation extracts specific columns from a relation?", "options": ["SELECT (σ)", "RENAME (ρ)", "PROJECT (π)", "DIFFERENCE (−)"], "answerIndex": 2 },
              { "question": "What does π_Name,Salary(EMPLOYEE) return?", "options": ["All employees with Name and Salary > 0", "A relation with only Name and Salary columns", "Employees sorted by Salary", "Count of employees"], "answerIndex": 1 },
              { "question": "The SELECT operation in relational algebra corresponds to which SQL clause?", "options": ["SELECT", "FROM", "WHERE", "GROUP BY"], "answerIndex": 2 },
              { "question": "π_Dept(EMPLOYEE) eliminates duplicate department names because:", "options": ["Relations are bags", "Relations are sets — duplicates are removed", "PROJECT sorts automatically", "Dept is a primary key"], "answerIndex": 1 }
            ],
            "procedure": [
              "Read the Aim and Theory sections carefully",
              "Review the sample EMPLOYEE and DEPARTMENT relations shown in the Simulation tab",
              "Write the SELECT expression for employees with Salary > 50000",
              "Write the PROJECT expression to extract Name and Dept",
              "Write the combined expression to find employees in the 'HR' department showing only their names",
              "Trace each expression step-by-step on the sample data to verify the output",
              "Go to the Code Test tab to execute equivalent SQL and compare results",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Sample Relations:\n-- EMPLOYEE(Emp_ID, Name, Dept, Salary)\n-- (1, 'Alice', 'HR', 65000)\n-- (2, 'Bob', 'IT', 48000)\n-- (3, 'Carol', 'HR', 72000)\n-- (4, 'Dave', 'Finance', 55000)\n\n-- (a) σ_Salary>50000 (EMPLOYEE)\n-- (b) π_Name,Dept (EMPLOYEE)\n-- (c) π_Name (σ_Dept='HR' (EMPLOYEE))\n\n-- SQL equivalents:\nSELECT * FROM EMPLOYEE WHERE Salary > 50000;\nSELECT Name, Dept FROM EMPLOYEE;\nSELECT Name FROM EMPLOYEE WHERE Dept = 'HR';",
              "steps": [
                { "line": 1, "annotation": "Start with the EMPLOYEE relation — 4 tuples", "memory": [], "output": "EMPLOYEE: (1,Alice,HR,65000), (2,Bob,IT,48000), (3,Carol,HR,72000), (4,Dave,Finance,55000)" },
                { "line": 2, "annotation": "Apply σ_Salary>50000: keep tuples where Salary > 50000", "memory": [], "output": "Result: (1,Alice,HR,65000), (3,Carol,HR,72000), (4,Dave,Finance,55000)" },
                { "line": 3, "annotation": "Apply π_Name,Dept: project two columns, duplicates removed", "memory": [], "output": "Result: (Alice,HR), (Bob,IT), (Carol,HR), (Dave,Finance)" },
                { "line": 4, "annotation": "Apply σ_Dept='HR' then π_Name: filter then project", "memory": [], "output": "After σ: (Alice,HR,65000),(Carol,HR,72000). After π_Name: (Alice),(Carol)" }
              ]
            },
            "posttest": [
              { "question": "What is the result of π_Dept(EMPLOYEE) on the sample data?", "options": ["{HR, IT, Finance, HR}", "{HR, IT, Finance}", "{Alice, Bob, Carol, Dave}", "All 4 tuples unchanged"], "answerIndex": 1 },
              { "question": "Which expression finds names of employees with salary between 50000 and 70000?", "options": ["π_Name(EMPLOYEE)", "σ_Salary>50000(π_Name(EMPLOYEE))", "π_Name(σ_Salary>50000 ∧ Salary<70000(EMPLOYEE))", "σ_Name(EMPLOYEE)"], "answerIndex": 2 },
              { "question": "How many tuples does σ_Dept='IT'(EMPLOYEE) return on the sample data?", "options": ["0", "1", "2", "4"], "answerIndex": 1 },
              { "question": "PROJECT eliminates duplicates because relational algebra treats relations as:", "options": ["Bags (multisets)", "Lists", "Sets", "Arrays"], "answerIndex": 2 },
              { "question": "The expression π_Name,Dept(σ_Salary>60000(EMPLOYEE)) is evaluated in which order?", "options": ["PROJECT first, then SELECT", "SELECT first, then PROJECT", "Both simultaneously", "Neither — the expression is invalid"], "answerIndex": 1 }
            ],
            references: [
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 4: Relational Algebra (Sections 4.1-4.3)",
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 5: The Relational Algebra (Sections 5.1-5.2)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: The Relational Algebra and Relational Calculus (Sections 8.1-8.3)",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 6: Relational Algebra",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 5: Relational Algebra"
              ]
          }
        },
        {
          "id": "db-w2-2",
          "title": "Set Operations and Join in Relational Algebra",
          "desc": "Given EMPLOYEE and DEPARTMENT relations, write relational algebra expressions for: (a) Natural join of EMPLOYEE and DEPARTMENT, (b) Find employees not working in any listed department (set difference), (c) Find employees who are also managers (rename + intersection).",
          "expected": "Correct relational algebra expressions for JOIN, SET DIFFERENCE, and INTERSECTION",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply advanced relational algebra operations. The student will:",
              "bullets": [
                "Apply Natural Join (⋈) to combine two relations on common attributes",
                "Apply Set Difference (−) to find tuples in one relation not in another",
                "Apply Intersection (∩) after renaming to find common data across relations",
                "Apply Cartesian Product (×) and understand why it requires a selection to form a meaningful join",
                "Apply the RENAME operation (ρ) to resolve attribute name conflicts"
              ]
            },
            "theory": [
              {
                "title": "Natural Join (⋈)",
                "body": [
                  "Natural join combines two relations on all attributes with the same name, eliminating duplicate columns.",
                  "Syntax: R ⋈ S — automatically matches tuples with equal values on common attributes.",
                  "Example: EMPLOYEE ⋈ DEPARTMENT — joins on Dept = Dept_Name (after renaming if needed).",
                  "The result includes all attributes of both relations, with the join attribute appearing only once."
                ]
              },
              {
                "title": "Cartesian Product (×) and Theta Join",
                "body": [
                  "Cartesian product R × S pairs every tuple of R with every tuple of S. If |R|=4 and |S|=3, the result has 12 tuples.",
                  "A Theta Join is σ_condition(R × S) — Cartesian product followed by a selection.",
                  "Equi-join: θ_join where condition uses equality (=). Natural join is a special equi-join."
                ]
              },
              {
                "title": "Set Difference (−)",
                "body": [
                  "R − S returns tuples in R that are NOT in S. Both R and S must be union-compatible (same number of attributes, same domains).",
                  "Example: Find employees not in any department: EMPLOYEE − π_Emp_ID(EMPLOYEE ⋈ DEPARTMENT)."
                ]
              },
              {
                "title": "RENAME (ρ)",
                "body": [
                  "ρ(NewName, Relation) renames a relation.",
                  "ρ(NewName(A1→B1, A2→B2), Relation) renames attributes.",
                  "Used to resolve naming conflicts in self-joins and set operations."
                ]
              }
            ],
            "pretest": [
              { "question": "Natural join eliminates duplicate columns. Which attributes are joined?", "options": ["All attributes", "Only primary keys", "All attributes with the same name", "Only foreign keys"], "answerIndex": 2 },
              { "question": "If |R| = 5 and |S| = 4, how many tuples does R × S produce?", "options": ["9", "20", "1", "Depends on data"], "answerIndex": 1 },
              { "question": "Which operation finds tuples present in R but not in S?", "options": ["R ∪ S", "R ∩ S", "R − S", "R ⋈ S"], "answerIndex": 2 },
              { "question": "For set operations (∪, ∩, −), the relations must be:", "options": ["Same primary key", "Union-compatible", "From the same database", "Sorted"], "answerIndex": 1 },
              { "question": "The RENAME operation ρ is primarily used to:", "options": ["Sort tuples", "Resolve attribute name conflicts", "Filter rows", "Project columns"], "answerIndex": 1 }
            ],
            "procedure": [
              "Review sample EMPLOYEE and DEPARTMENT data in the Simulation tab",
              "Write the Natural Join expression EMPLOYEE ⋈ DEPARTMENT",
              "Trace the join manually and verify which tuples match",
              "Write the Set Difference expression to find unmatched employees",
              "Use RENAME to align attribute names for the intersection problem",
              "Execute equivalent SQL in the Code Test tab",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- EMPLOYEE(Emp_ID, Name, Dept_ID, Salary)\n-- DEPARTMENT(Dept_ID, Dept_Name, Manager_ID)\n\n-- (a) Natural Join\n-- EMPLOYEE ⋈ DEPARTMENT\n\n-- (b) Employees with no matching department\n-- π_Emp_ID,Name(EMPLOYEE) − π_Emp_ID,Name(EMPLOYEE ⋈ DEPARTMENT)\n\n-- SQL equivalents:\nSELECT E.*, D.Dept_Name FROM EMPLOYEE E NATURAL JOIN DEPARTMENT D;\nSELECT Emp_ID, Name FROM EMPLOYEE\n  WHERE Dept_ID NOT IN (SELECT Dept_ID FROM DEPARTMENT);",
              "steps": [
                { "line": 1, "annotation": "Natural Join matches on Dept_ID (common attribute)", "memory": [], "output": "Joined tuples: each employee row extended with matching Dept_Name and Manager_ID" },
                { "line": 2, "annotation": "Set difference finds employees with no department record", "memory": [], "output": "Employees in EMPLOYEE but Dept_ID not in DEPARTMENT — orphan records" },
                { "line": 3, "annotation": "Cartesian product size warning: 4 employees × 3 departments = 12 tuples before selection", "memory": [], "output": "Without selection: 12 tuples. With equi-join condition: meaningful result" }
              ]
            },
            "posttest": [
              { "question": "Natural join of EMPLOYEE and DEPARTMENT on Dept_ID produces:", "options": ["All pairs regardless of Dept_ID", "Only matching Dept_ID pairs, one Dept_ID column", "Only matching pairs, Dept_ID appears twice", "Only EMPLOYEE tuples"], "answerIndex": 1 },
              { "question": "What SQL clause is equivalent to a Theta Join's condition?", "options": ["FROM", "WHERE", "SELECT", "ORDER BY"], "answerIndex": 1 },
              { "question": "R ∩ S is equivalent to which expression using set difference?", "options": ["R − (R − S)", "(R ∪ S) − R", "R − S", "S − R"], "answerIndex": 0 },
              { "question": "Why is RENAME needed before a self-join of EMPLOYEE?", "options": ["To sort the table", "To create a copy with different attribute names to avoid ambiguity", "To remove duplicates", "To change the primary key"], "answerIndex": 1 },
              { "question": "Which expression finds all employees who are also managers?", "options": ["EMPLOYEE ∪ DEPARTMENT", "π_Emp_ID(EMPLOYEE) ∩ π_Manager_ID(DEPARTMENT)", "EMPLOYEE − DEPARTMENT", "EMPLOYEE ⋈ DEPARTMENT"], "answerIndex": 1 }
            ],
            references: [
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 4: Relational Algebra (Sections 4.4-4.5 on Joins and Set Operations)",
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 5: The Relational Algebra (Sections 5.3-5.4 on Join Operations)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: Relational Algebra (Sections 8.4-8.6 on Join and Set Operations)",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 7: Relational Algebra — Advanced Operations",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 5: Joins and Set Operations"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 3",
      "objective": "SQL DDL — CREATE, ALTER, DROP; Table definitions and constraints",
      "tutorial": "Tutorial 3: SQL Data Definition Language",
      "labTitle": "Lab 3: Creating and Managing Tables",
      "experiments": [
        {
          "id": "db-w3-1",
          "title": "CREATE TABLE with Constraints",
          "desc": "Create a relational schema for a Student database: STUDENT(Roll_No, Name, Age, Email, Dept_ID), DEPARTMENT(Dept_ID, Dept_Name), COURSE(Course_ID, Title, Credits, Dept_ID). Apply PRIMARY KEY, NOT NULL, UNIQUE, CHECK, DEFAULT, and FOREIGN KEY constraints.",
          "expected": "Tables created successfully; inserting invalid data triggers appropriate constraint violations",
          "content": {
            "aim": {
              "text": "In this experiment, the student will define a relational schema using SQL DDL commands. The student will:",
              "bullets": [
                "Write CREATE TABLE statements with appropriate data types",
                "Define PRIMARY KEY constraints (single and composite)",
                "Define NOT NULL, UNIQUE, CHECK, and DEFAULT constraints",
                "Define FOREIGN KEY constraints with ON DELETE and ON UPDATE actions",
                "Test that constraint violations are correctly rejected by the DBMS"
              ]
            },
            "theory": [
              {
                "title": "CREATE TABLE Syntax",
                "body": [
                  "CREATE TABLE table_name (",
                  "    column_name datatype [column_constraints],",
                  "    ...",
                  "    [table_constraints]",
                  ");",
                  "Data types: INT, VARCHAR(n), CHAR(n), FLOAT, DECIMAL(p,s), DATE, BOOLEAN."
                ]
              },
              {
                "title": "Integrity Constraints",
                "body": [
                  "PRIMARY KEY: Uniquely identifies each row. Implies NOT NULL. A table can have only one primary key.",
                  "NOT NULL: The column cannot contain a NULL value.",
                  "UNIQUE: All values in the column must be distinct. Unlike PK, UNIQUE columns can contain one NULL.",
                  "CHECK: Values must satisfy a specified condition. Example: CHECK (Age >= 17 AND Age <= 30).",
                  "DEFAULT: Provides a default value when no value is supplied. Example: DEFAULT 'CSE'."
                ]
              },
              {
                "title": "FOREIGN KEY and Referential Integrity",
                "body": [
                  "FOREIGN KEY references a PRIMARY KEY in another table, enforcing referential integrity.",
                  "ON DELETE CASCADE: When the referenced row is deleted, dependent rows are also deleted.",
                  "ON DELETE SET NULL: Sets the foreign key to NULL when the referenced row is deleted.",
                  "ON UPDATE CASCADE: Updates the foreign key when the referenced key changes."
                ]
              },
              {
                "title": "ALTER TABLE",
                "body": [
                  "ALTER TABLE table_name ADD column_name datatype; — adds a new column",
                  "ALTER TABLE table_name DROP COLUMN column_name; — removes a column",
                  "ALTER TABLE table_name MODIFY column_name new_datatype; — changes data type",
                  "ALTER TABLE table_name ADD CONSTRAINT name CHECK (condition); — adds a constraint"
                ]
              }
            ],
            "pretest": [
              { "question": "Which constraint ensures no two rows have the same value in a column?", "options": ["NOT NULL", "DEFAULT", "UNIQUE", "CHECK"], "answerIndex": 2 },
              { "question": "A PRIMARY KEY constraint implies:", "options": ["UNIQUE only", "NOT NULL only", "Both UNIQUE and NOT NULL", "DEFAULT value"], "answerIndex": 2 },
              { "question": "Which constraint enforces that a column's value must satisfy a condition like Age >= 18?", "options": ["NOT NULL", "CHECK", "UNIQUE", "FOREIGN KEY"], "answerIndex": 1 },
              { "question": "ON DELETE CASCADE means:", "options": ["Deletion is prevented", "Parent row is deleted, child rows set to NULL", "When parent is deleted, child rows are also deleted", "Deletion updates the foreign key"], "answerIndex": 2 },
              { "question": "How many PRIMARY KEY constraints can a table have?", "options": ["Unlimited", "One", "Two", "One per column"], "answerIndex": 1 }
            ],
            "procedure": [
              "Read the Aim and Theory sections carefully",
              "Open the Code Test tab — starter code is pre-loaded with the CREATE TABLE statements",
              "Read each constraint carefully before executing",
              "Click Run to execute the schema creation",
              "Test NOT NULL by inserting a row without a Name value — observe the error",
              "Test CHECK by inserting a student with Age = 15 — observe the constraint violation",
              "Test FOREIGN KEY by inserting a student with a non-existent Dept_ID",
              "Use ALTER TABLE to add a Phone_No column to STUDENT",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "CREATE TABLE DEPARTMENT (\n    Dept_ID   INT PRIMARY KEY,\n    Dept_Name VARCHAR(50) NOT NULL UNIQUE\n);\n\nCREATE TABLE STUDENT (\n    Roll_No   INT PRIMARY KEY,\n    Name      VARCHAR(100) NOT NULL,\n    Age       INT CHECK (Age >= 17 AND Age <= 30),\n    Email     VARCHAR(100) UNIQUE,\n    Dept_ID   INT DEFAULT 1,\n    FOREIGN KEY (Dept_ID) REFERENCES DEPARTMENT(Dept_ID)\n        ON DELETE SET NULL\n        ON UPDATE CASCADE\n);\n\nCREATE TABLE COURSE (\n    Course_ID  CHAR(8) PRIMARY KEY,\n    Title      VARCHAR(100) NOT NULL,\n    Credits    INT CHECK (Credits IN (1, 2, 3, 4)),\n    Dept_ID    INT,\n    FOREIGN KEY (Dept_ID) REFERENCES DEPARTMENT(Dept_ID)\n        ON DELETE CASCADE\n);\n\n-- Test constraints:\nINSERT INTO DEPARTMENT VALUES (1, 'CSE'), (2, 'IT'), (3, 'ECE');\nINSERT INTO STUDENT VALUES (101, 'Alice', 20, 'alice@edu.in', 1);\nINSERT INTO STUDENT VALUES (102, NULL, 22, 'bob@edu.in', 2); -- ERROR: NOT NULL\nINSERT INTO STUDENT VALUES (103, 'Carol', 15, 'carol@edu.in', 1); -- ERROR: CHECK",
              "steps": [
                { "line": 1, "annotation": "DEPARTMENT table created with PK and UNIQUE constraints", "memory": [], "output": "Table DEPARTMENT created successfully" },
                { "line": 2, "annotation": "STUDENT table created with PK, NOT NULL, CHECK, UNIQUE, DEFAULT, FK", "memory": [], "output": "Table STUDENT created successfully" },
                { "line": 3, "annotation": "COURSE table created with FK to DEPARTMENT, ON DELETE CASCADE", "memory": [], "output": "Table COURSE created successfully" },
                { "line": 4, "annotation": "Valid inserts succeed", "memory": [], "output": "Rows inserted: DEPARTMENT (3 rows), STUDENT Alice (1 row)" },
                { "line": 5, "annotation": "NULL in NOT NULL column — constraint violation", "memory": [], "output": "ERROR: NOT NULL constraint failed: STUDENT.Name" },
                { "line": 6, "annotation": "Age = 15 fails CHECK constraint", "memory": [], "output": "ERROR: CHECK constraint failed: Age >= 17 AND Age <= 30" }
              ]
            },
            "posttest": [
              { "question": "What happens when you try to INSERT a student with a Dept_ID that does not exist in DEPARTMENT?", "options": ["The row is inserted with NULL Dept_ID", "A FOREIGN KEY constraint violation error is raised", "The student is inserted and DEPARTMENT is updated", "Nothing happens"], "answerIndex": 1 },
              { "question": "Which ALTER TABLE command adds a column Phone_No VARCHAR(15) to STUDENT?", "options": ["ALTER TABLE STUDENT ADD COLUMN Phone_No VARCHAR(15);", "ALTER STUDENT ADD Phone_No VARCHAR(15);", "UPDATE TABLE STUDENT ADD Phone_No VARCHAR(15);", "INSERT COLUMN Phone_No INTO STUDENT;"], "answerIndex": 0 },
              { "question": "If Dept_ID has ON DELETE CASCADE in COURSE, deleting a department will:", "options": ["Raise a foreign key error", "Set Course.Dept_ID to NULL", "Delete all courses in that department", "No effect"], "answerIndex": 2 },
              { "question": "Can a UNIQUE column contain a NULL value?", "options": ["No, UNIQUE implies NOT NULL", "Yes, UNIQUE allows one NULL", "Yes, UNIQUE allows multiple NULLs in most databases", "No, NULL is never allowed"], "answerIndex": 2 },
              { "question": "Which constraint would you use to ensure Credits is only 1, 2, 3, or 4?", "options": ["NOT NULL", "UNIQUE", "DEFAULT", "CHECK"], "answerIndex": 3 }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 1: Introduction (Sections 1.5-1.6 on Data Definition)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries, Constraints, Triggers (Section 5.2 on DDL)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 4: SQL: Data Definition and Constraints",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 9: SQL — DDL",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 7: Introduction to SQL — DDL Commands"
              ]
          }
        },
        {
          "id": "db-w3-2",
          "title": "DML Operations — INSERT, UPDATE, DELETE",
          "desc": "Using the Student database schema from the previous experiment, perform: (a) INSERT multiple rows, (b) UPDATE salary/department, (c) DELETE with conditions, (d) Verify referential integrity after DELETE.",
          "expected": "Correct DML operations that modify the database state and enforce integrity",
          "content": {
            "aim": {
              "text": "In this experiment, the student will manipulate data in relational tables using SQL DML commands. The student will:",
              "bullets": [
                "Insert single and multiple rows using INSERT INTO ... VALUES and INSERT INTO ... SELECT",
                "Update rows conditionally using UPDATE ... SET ... WHERE",
                "Delete rows conditionally using DELETE FROM ... WHERE",
                "Observe how referential integrity constrains DML operations",
                "Use TRUNCATE and understand its difference from DELETE"
              ]
            },
            "theory": [
              {
                "title": "INSERT Statement",
                "body": [
                  "INSERT INTO table_name (col1, col2, ...) VALUES (val1, val2, ...);",
                  "Column list is optional if all columns are provided in the correct order.",
                  "INSERT INTO table_name SELECT ... FROM ... — inserts data from a query result.",
                  "Multiple row insert: INSERT INTO t VALUES (r1), (r2), (r3);"
                ]
              },
              {
                "title": "UPDATE Statement",
                "body": [
                  "UPDATE table_name SET col1 = val1, col2 = val2 WHERE condition;",
                  "Without WHERE clause, ALL rows are updated — a common mistake.",
                  "Example: UPDATE STUDENT SET Dept_ID = 2 WHERE Roll_No = 101;"
                ]
              },
              {
                "title": "DELETE Statement",
                "body": [
                  "DELETE FROM table_name WHERE condition;",
                  "Without WHERE, all rows are deleted (table structure remains).",
                  "TRUNCATE TABLE table_name; — removes all rows faster but cannot be rolled back in many databases.",
                  "DELETE can be rolled back if wrapped in a transaction; TRUNCATE usually cannot."
                ]
              }
            ],
            "pretest": [
              { "question": "Which SQL command is used to add new rows to a table?", "options": ["ADD", "UPDATE", "INSERT", "CREATE"], "answerIndex": 2 },
              { "question": "What happens when UPDATE is run without a WHERE clause?", "options": ["Only the first row is updated", "No rows are updated", "All rows are updated", "A syntax error occurs"], "answerIndex": 2 },
              { "question": "What is the difference between DELETE and TRUNCATE?", "options": ["DELETE removes structure, TRUNCATE removes only data", "DELETE can have a WHERE clause and is logged; TRUNCATE removes all rows quickly", "They are identical", "TRUNCATE is faster but adds a WHERE clause automatically"], "answerIndex": 1 },
              { "question": "Which statement copies rows from one table to another?", "options": ["INSERT INTO t1 SELECT * FROM t2;", "COPY FROM t2 INTO t1;", "UPDATE t1 FROM t2;", "MOVE t2 TO t1;"], "answerIndex": 0 },
              { "question": "Can you DELETE a row from DEPARTMENT if a STUDENT row references it with ON DELETE RESTRICT?", "options": ["Yes, always", "No, referential integrity prevents it", "Yes, but the student row is set to NULL", "Yes, but the student row is also deleted"], "answerIndex": 1 }
            ],
            "procedure": [
              "Open the Code Test tab with the pre-loaded DML statements",
              "Execute INSERT statements to populate DEPARTMENT, STUDENT, and COURSE tables",
              "Execute UPDATE to change a student's department",
              "Execute UPDATE to increase salary (if applicable to the schema)",
              "Execute DELETE to remove a student with a specific condition",
              "Try deleting a department that has students — observe the referential integrity error",
              "Execute TRUNCATE and compare with DELETE",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- INSERT rows\nINSERT INTO DEPARTMENT VALUES (1,'CSE'),(2,'IT'),(3,'ECE');\n\nINSERT INTO STUDENT (Roll_No, Name, Age, Email, Dept_ID) VALUES\n  (101, 'Alice',  20, 'alice@edu.in',  1),\n  (102, 'Bob',    22, 'bob@edu.in',    2),\n  (103, 'Carol',  21, 'carol@edu.in',  1),\n  (104, 'Dave',   23, 'dave@edu.in',   3);\n\n-- UPDATE\nUPDATE STUDENT SET Dept_ID = 2 WHERE Roll_No = 103;\n\n-- DELETE\nDELETE FROM STUDENT WHERE Age > 22;\n\n-- Try deleting a referenced department\nDELETE FROM DEPARTMENT WHERE Dept_ID = 1; -- May fail if FK is RESTRICT\n\n-- Verify\nSELECT * FROM STUDENT;\nSELECT * FROM DEPARTMENT;",
              "steps": [
                { "line": 1, "annotation": "INSERT 3 departments — PK constraint ensures no duplicates", "memory": [], "output": "3 rows inserted into DEPARTMENT" },
                { "line": 2, "annotation": "INSERT 4 students — all constraints satisfied", "memory": [], "output": "4 rows inserted into STUDENT" },
                { "line": 3, "annotation": "UPDATE Carol's Dept_ID from 1 to 2", "memory": [], "output": "1 row updated: Carol now in IT (Dept_ID=2)" },
                { "line": 4, "annotation": "DELETE students with Age > 22 — affects Dave (age 23)", "memory": [], "output": "1 row deleted: Dave removed" },
                { "line": 5, "annotation": "SELECT shows remaining 3 students", "memory": [], "output": "STUDENT: Alice(101,CSE), Bob(102,IT), Carol(103,IT)" }
              ]
            },
            "posttest": [
              { "question": "After DELETE FROM STUDENT WHERE Age > 22, how many rows remain?", "options": ["4", "3", "2", "0"], "answerIndex": 1 },
              { "question": "What SQL statement updates the email of student with Roll_No = 101?", "options": ["UPDATE STUDENT SET Email='new@edu.in';", "UPDATE STUDENT SET Email='new@edu.in' WHERE Roll_No=101;", "MODIFY STUDENT Email='new@edu.in' WHERE Roll_No=101;", "ALTER STUDENT SET Email='new@edu.in' WHERE Roll_No=101;"], "answerIndex": 1 },
              { "question": "Which operation deletes all rows but keeps the table structure?", "options": ["DROP TABLE", "DELETE FROM t;", "Both DELETE FROM t; and TRUNCATE TABLE t;", "REMOVE TABLE"], "answerIndex": 2 },
              { "question": "INSERT INTO STUDENT SELECT * FROM ARCHIVE_STUDENT WHERE Age < 25; does what?", "options": ["Creates a new table", "Copies qualifying rows from ARCHIVE_STUDENT into STUDENT", "Replaces STUDENT with ARCHIVE_STUDENT", "Deletes matching rows"], "answerIndex": 1 },
              { "question": "A student's Dept_ID is set to ON DELETE SET NULL. After the referenced department is deleted, the student's Dept_ID becomes:", "options": ["0", "Deleted", "NULL", "Default value"], "answerIndex": 2 }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 3: Introduction to SQL (Sections 3.1-3.2 on DML)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries, Constraints, Triggers (Section 5.1 on DML)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: SQL: DML Operations",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 10: SQL — DML",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 7: Data Manipulation Language (DML)"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 4",
      "objective": "Basic SQL querying — SELECT, WHERE, arithmetic and logical operations, SQL functions",
      "tutorial": "Tutorial 4: SQL SELECT and Built-in Functions",
      "labTitle": "Lab 4: SQL Queries and Functions",
      "experiments": [
        {
          "id": "db-w4-1",
          "title": "SELECT with WHERE, Arithmetic and Logical Operators",
          "desc": "On the Student-Course-Department database: (a) Find students older than 20, (b) Find students in CSE or IT, (c) Find students whose name starts with 'A', (d) Calculate GPA from marks using arithmetic expressions.",
          "expected": "Correct query results with appropriate filtering and computed columns",
          "content": {
            "aim": {
              "text": "In this experiment, the student will write SQL SELECT queries using WHERE clause with arithmetic and logical operators. The student will:",
              "bullets": [
                "Use comparison operators (=, <>, <, >, <=, >=) in the WHERE clause",
                "Use logical operators AND, OR, NOT to combine conditions",
                "Use BETWEEN, IN, LIKE, and IS NULL operators",
                "Write arithmetic expressions in the SELECT list to compute derived values",
                "Use column aliases with AS to label computed columns"
              ]
            },
            "theory": [
              {
                "title": "SELECT Statement Syntax",
                "body": [
                  "SELECT [DISTINCT] col1, col2, expr AS alias FROM table_name WHERE condition ORDER BY col;",
                  "The WHERE clause filters rows before any grouping or ordering.",
                  "Arithmetic expressions can appear in both SELECT list and WHERE clause: SELECT Marks * 0.1 AS GPA FROM MARKS;"
                ]
              },
              {
                "title": "Comparison and Logical Operators",
                "body": [
                  "Comparison: = (equal), <> or != (not equal), < (less), > (greater), <= (less or equal), >= (greater or equal).",
                  "Logical: AND (both conditions true), OR (at least one true), NOT (negates condition).",
                  "Example: WHERE Age > 20 AND Dept_ID = 1 — students older than 20 in department 1."
                ]
              },
              {
                "title": "BETWEEN, IN, LIKE, IS NULL",
                "body": [
                  "BETWEEN: WHERE Age BETWEEN 18 AND 22 — equivalent to Age >= 18 AND Age <= 22.",
                  "IN: WHERE Dept IN ('CSE','IT') — matches any value in the list.",
                  "LIKE: WHERE Name LIKE 'A%' — % matches any sequence of characters, _ matches exactly one character.",
                  "IS NULL / IS NOT NULL: WHERE Email IS NULL — checks for missing values. Do NOT use = NULL."
                ]
              },
              {
                "title": "Arithmetic in SELECT",
                "body": [
                  "SELECT Marks / 10.0 AS GPA computes GPA from marks in the output.",
                  "SELECT Name, Salary * 12 AS Annual_Salary FROM EMPLOYEE — computes derived column.",
                  "Use ROUND(expr, n) to control decimal places in computed output."
                ]
              }
            ],
            "pretest": [
              { "question": "Which operator checks if a value lies within a range (inclusive)?", "options": ["IN", "LIKE", "BETWEEN", "IS NULL"], "answerIndex": 2 },
              { "question": "What does LIKE 'A%' match?", "options": ["Names starting with A", "Names ending with A", "Names containing A anywhere", "Names exactly equal to A"], "answerIndex": 0 },
              { "question": "Which clause is used to check for NULL values in SQL?", "options": ["= NULL", "IS NULL", "== NULL", "NULL()"], "answerIndex": 1 },
              { "question": "What is the result of SELECT 10 / 3 in integer SQL arithmetic?", "options": ["3.33", "3", "4", "0"], "answerIndex": 1 },
              { "question": "WHERE Dept IN ('CSE','IT') is equivalent to:", "options": ["WHERE Dept = 'CSE' AND Dept = 'IT'", "WHERE Dept = 'CSE' OR Dept = 'IT'", "WHERE Dept BETWEEN 'CSE' AND 'IT'", "WHERE Dept LIKE 'CSE' OR 'IT'"], "answerIndex": 1 }
            ],
            "procedure": [
              "Open the Code Test tab — the STUDENT, DEPARTMENT, and MARKS tables are pre-populated",
              "Run Query (a): SELECT * FROM STUDENT WHERE Age > 20",
              "Run Query (b): SELECT * FROM STUDENT WHERE Dept IN ('CSE','IT')",
              "Run Query (c): SELECT * FROM STUDENT WHERE Name LIKE 'A%'",
              "Run Query (d): SELECT Roll_No, Name, ROUND(Marks/10.0, 2) AS GPA FROM MARKS JOIN STUDENT USING(Roll_No)",
              "Verify each result set matches the expected output shown in the Simulation tab",
              "Try modifying conditions (e.g., change 'A%' to '%a%') and observe result changes",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Sample data setup\nCREATE TABLE DEPARTMENT(Dept_ID INT PRIMARY KEY, Dept_Name VARCHAR(20));\nCREATE TABLE STUDENT(Roll_No INT PRIMARY KEY, Name VARCHAR(50), Age INT, Dept_Name VARCHAR(20), Email VARCHAR(50));\nCREATE TABLE MARKS(Roll_No INT, Course_ID VARCHAR(10), Marks INT);\n\nINSERT INTO DEPARTMENT VALUES (1,'CSE'),(2,'IT'),(3,'ECE');\nINSERT INTO STUDENT VALUES\n  (101,'Alice',21,'CSE','alice@edu.in'),\n  (102,'Bob',19,'IT','bob@edu.in'),\n  (103,'Carol',23,'CSE','carol@edu.in'),\n  (104,'David',20,'ECE','david@edu.in'),\n  (105,'Amy',22,'IT','amy@edu.in');\nINSERT INTO MARKS VALUES (101,'CS101',85),(102,'CS101',72),(103,'CS101',91),(104,'CS101',60),(105,'CS101',78);\n\n-- (a) Students older than 20\nSELECT * FROM STUDENT WHERE Age > 20;\n\n-- (b) Students in CSE or IT\nSELECT * FROM STUDENT WHERE Dept_Name IN ('CSE','IT');\n\n-- (c) Names starting with 'A'\nSELECT * FROM STUDENT WHERE Name LIKE 'A%';\n\n-- (d) GPA from marks\nSELECT S.Roll_No, S.Name, M.Marks, ROUND(M.Marks/10.0,2) AS GPA\nFROM STUDENT S JOIN MARKS M ON S.Roll_No = M.Roll_No;",
              "steps": [
                { "line": 1, "annotation": "Tables created and populated with 5 students and their marks", "memory": [], "output": "Tables ready: STUDENT (5 rows), MARKS (5 rows)" },
                { "line": 2, "annotation": "WHERE Age > 20 filters Alice(21), Carol(23), Amy(22)", "memory": [], "output": "Result: Alice(21,CSE), Carol(23,CSE), Amy(22,IT)" },
                { "line": 3, "annotation": "IN ('CSE','IT') matches Alice, Bob, Carol, Amy — excludes David (ECE)", "memory": [], "output": "Result: Alice, Bob, Carol, Amy — 4 rows" },
                { "line": 4, "annotation": "LIKE 'A%' matches Alice and Amy", "memory": [], "output": "Result: Alice(101,CSE), Amy(105,IT)" },
                { "line": 5, "annotation": "JOIN and compute GPA = Marks/10.0", "memory": [], "output": "Alice:8.50, Bob:7.20, Carol:9.10, David:6.00, Amy:7.80" }
              ]
            },
            "posttest": [
              { "question": "How many rows does SELECT * FROM STUDENT WHERE Age BETWEEN 19 AND 21 return on the sample data?", "options": ["1", "2", "3", "4"], "answerIndex": 2 },
              { "question": "What does WHERE Name LIKE '_o%' match?", "options": ["Names starting with o", "Names where the second character is o", "Names ending with o", "Names containing exactly two characters"], "answerIndex": 1 },
              { "question": "Which query correctly finds students NOT in CSE?", "options": ["WHERE Dept_Name = NOT 'CSE'", "WHERE Dept_Name <> 'CSE'", "WHERE NOT Dept_Name IN 'CSE'", "WHERE Dept_Name != NULL"], "answerIndex": 1 },
              { "question": "SELECT Name, Marks * 0.1 AS GPA — what data type is the GPA column?", "options": ["INT", "FLOAT/REAL", "VARCHAR", "BOOLEAN"], "answerIndex": 1 },
              { "question": "What is the output of WHERE Email IS NOT NULL for the sample data?", "options": ["0 rows", "5 rows", "Only rows where Email is blank", "Error"], "answerIndex": 1 }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 3: Introduction to SQL (Section 3.4 on WHERE Clause)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Sections 5.3-5.4 on SELECT-FROM-WHERE)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: SQL Queries (Basic SELECT)",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — SELECT Statement",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: SQL Queries — Basic SELECT"
              ]
          }
        },
        {
          "id": "db-w4-2",
          "title": "SQL Built-in Functions — String, Numeric, Date",
          "desc": "Demonstrate: (a) UPPER, LOWER, LENGTH, SUBSTR on Name column, (b) ROUND, ABS, CEIL/FLOOR on numeric values, (c) Date functions — date(), strftime(), calculating age from Date_of_Birth.",
          "expected": "Results showing string transformations, numeric rounding, and date calculations",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply SQL built-in functions to process string, numeric, and date data. The student will:",
              "bullets": [
                "Apply string functions: UPPER, LOWER, LENGTH, SUBSTR, TRIM, REPLACE, INSTR",
                "Apply numeric functions: ROUND, ABS, and equivalent of CEIL/FLOOR",
                "Apply date functions: date(), strftime(), julianday() in SQLite",
                "Combine functions in a single SELECT expression",
                "Use functions in WHERE clauses to filter based on computed values"
              ]
            },
            "theory": [
              {
                "title": "String Functions",
                "body": [
                  "UPPER(str): Converts string to uppercase. UPPER('alice') → 'ALICE'.",
                  "LOWER(str): Converts to lowercase. LOWER('ALICE') → 'alice'.",
                  "LENGTH(str): Returns number of characters. LENGTH('Alice') → 5.",
                  "SUBSTR(str, start, len): Extracts substring. SUBSTR('Alice',1,3) → 'Ali' (1-indexed).",
                  "TRIM(str): Removes leading and trailing spaces.",
                  "REPLACE(str, old, new): Replaces occurrences. REPLACE('Alice','A','@') → '@lice'.",
                  "|| operator: String concatenation. 'Hello' || ' ' || 'World' → 'Hello World'."
                ]
              },
              {
                "title": "Numeric Functions",
                "body": [
                  "ROUND(x, n): Rounds x to n decimal places. ROUND(3.14159, 2) → 3.14.",
                  "ABS(x): Absolute value. ABS(-5) → 5.",
                  "In SQLite: CAST(CEIL equivalent) — use CAST(x+0.9999 AS INT) or min() workaround.",
                  "MOD(x, y) or x % y: Remainder. 10 % 3 → 1."
                ]
              },
              {
                "title": "Date Functions (SQLite)",
                "body": [
                  "date('now'): Returns current date as 'YYYY-MM-DD'.",
                  "strftime('%Y', DOB): Extracts year from a date.",
                  "julianday('now') - julianday(DOB): Difference in days between two dates.",
                  "Age in years: CAST((julianday('now') - julianday(DOB)) / 365.25 AS INT).",
                  "Date arithmetic: date('now', '-18 years') gives the date 18 years ago."
                ]
              }
            ],
            "pretest": [
              { "question": "What does SUBSTR('Database', 5, 4) return?", "options": ["Data", "base", "abas", "base"], "answerIndex": 1 },
              { "question": "Which function returns the number of characters in a string?", "options": ["SIZE()", "COUNT()", "LENGTH()", "LEN()"], "answerIndex": 2 },
              { "question": "What does ROUND(7.856, 1) return?", "options": ["7.9", "7.8", "8.0", "7.85"], "answerIndex": 0 },
              { "question": "In SQLite, which function returns today's date?", "options": ["NOW()", "SYSDATE()", "date('now')", "CURRENT_DATE()"], "answerIndex": 2 },
              { "question": "What does 'Hello' || ' ' || 'World' produce?", "options": ["HelloWorld", "Hello World", "Hello+World", "Error"], "answerIndex": 1 }
            ],
            "procedure": [
              "Open the Code Test tab with the pre-loaded STUDENT table (includes DOB column)",
              "Run string function queries: UPPER(Name), LOWER(Name), LENGTH(Name), SUBSTR(Name,1,3)",
              "Combine first name and last name using || concatenation",
              "Run numeric function query: ROUND(Marks/10.0, 1) AS GPA on MARKS table",
              "Run date query to compute each student's age from their DOB",
              "Use a function in WHERE: SELECT * FROM STUDENT WHERE LENGTH(Name) > 4",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- String functions\nSELECT Name,\n       UPPER(Name)       AS Upper_Name,\n       LOWER(Name)       AS Lower_Name,\n       LENGTH(Name)      AS Name_Len,\n       SUBSTR(Name,1,3)  AS Name_Prefix\nFROM STUDENT;\n\n-- Concatenation\nSELECT Roll_No, Name || ' (' || Dept_Name || ')' AS Student_Info FROM STUDENT;\n\n-- Numeric functions on marks\nSELECT Roll_No, Marks,\n       ROUND(Marks/10.0, 1)  AS GPA,\n       ABS(Marks - 75)       AS Deviation_From_75\nFROM MARKS;\n\n-- Date: compute age from DOB (STUDENT table has DOB column)\n-- ALTER TABLE STUDENT ADD DOB TEXT;\n-- UPDATE STUDENT SET DOB='2003-06-15' WHERE Roll_No=101;\nSELECT Name,\n       DOB,\n       CAST((julianday('now') - julianday(DOB))/365.25 AS INT) AS Age_Computed\nFROM STUDENT WHERE DOB IS NOT NULL;\n\n-- Function in WHERE\nSELECT * FROM STUDENT WHERE LENGTH(Name) > 4;",
              "steps": [
                { "line": 1, "annotation": "String functions applied to each Name value", "memory": [], "output": "Alice→ALICE/alice/5/Ali, Bob→BOB/bob/3/Bob, Carol→CAROL/carol/5/Car" },
                { "line": 2, "annotation": "Concatenation builds display string", "memory": [], "output": "Alice (CSE), Bob (IT), Carol (CSE), David (ECE), Amy (IT)" },
                { "line": 3, "annotation": "ROUND and ABS computed on each marks row", "memory": [], "output": "Alice: Marks=85, GPA=8.5, Deviation=10; Carol: Marks=91, GPA=9.1, Deviation=16" },
                { "line": 4, "annotation": "Age computed using julianday difference", "memory": [], "output": "Age = floor((today - DOB) / 365.25)" },
                { "line": 5, "annotation": "WHERE LENGTH(Name)>4 filters Bob(3) and Amy(3)", "memory": [], "output": "Alice(5), Carol(5), David(5) — 3 rows" }
              ]
            },
            "posttest": [
              { "question": "What does SUBSTR('Management',4,4) return?", "options": ["Mana", "nage", "agem", "geme"], "answerIndex": 2 },
              { "question": "SELECT REPLACE('Hello World','World','SQL') returns:", "options": ["Hello SQL", "Hello World SQL", "Hello", "SQL Hello"], "answerIndex": 0 },
              { "question": "How many rows does WHERE LENGTH(Name) = 3 return on the sample data (Alice, Bob, Carol, David, Amy)?", "options": ["1", "2", "3", "0"], "answerIndex": 1 },
              { "question": "What does ROUND(8.75, 1) return?", "options": ["8.7", "8.8", "9.0", "8.75"], "answerIndex": 1 },
              { "question": "What does strftime('%m', '2003-06-15') return?", "options": ["2003", "06", "15", "6"], "answerIndex": 1 }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 3: Introduction to SQL (Section 3.4.3 on Built-in Functions)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.4 on SQL Functions)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: SQL Functions",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 12: SQL — Functions",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Built-in Functions in SQL"
              ]
          }
        },
        {
          "id": "db-w4-3",
          "title": "Aggregate Functions — COUNT, SUM, AVG, MAX, MIN",
          "desc": "Using STUDENT and MARKS tables: (a) Count total students per department, (b) Find average marks per course, (c) Find the highest and lowest marks, (d) Find total credits per student.",
          "expected": "Correct aggregate results; NULL handling in aggregates demonstrated",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply SQL aggregate functions to summarize data. The student will:",
              "bullets": [
                "Use COUNT(*), COUNT(col), COUNT(DISTINCT col) to count rows",
                "Use SUM, AVG, MAX, MIN on numeric columns",
                "Understand how aggregate functions handle NULL values",
                "Use GROUP BY to apply aggregates to subgroups",
                "Use HAVING to filter groups after aggregation"
              ]
            },
            "theory": [
              {
                "title": "Aggregate Functions Overview",
                "body": [
                  "Aggregate functions operate on a set of rows and return a single value per group.",
                  "COUNT(*): Counts all rows including NULLs.",
                  "COUNT(col): Counts non-NULL values in col.",
                  "COUNT(DISTINCT col): Counts unique non-NULL values.",
                  "SUM(col): Sum of non-NULL numeric values.",
                  "AVG(col): Average of non-NULL values = SUM/COUNT(col).",
                  "MAX(col) / MIN(col): Largest / smallest non-NULL value."
                ]
              },
              {
                "title": "NULL Handling in Aggregates",
                "body": [
                  "All aggregate functions except COUNT(*) ignore NULL values.",
                  "If a column contains 5 rows with one NULL, AVG divides by 4 (not 5).",
                  "COUNT(*) returns the total number of rows regardless of NULLs.",
                  "This can lead to unexpected results — always be aware of NULLs in your data."
                ]
              },
              {
                "title": "GROUP BY and HAVING",
                "body": [
                  "GROUP BY col: Groups rows with the same value in col; aggregate functions apply per group.",
                  "Columns in SELECT that are not aggregated must appear in GROUP BY.",
                  "HAVING condition: Filters groups after aggregation. WHERE filters rows before aggregation.",
                  "Example: HAVING COUNT(*) > 2 keeps only departments with more than 2 students."
                ]
              }
            ],
            "pretest": [
              { "question": "What is the difference between COUNT(*) and COUNT(col)?", "options": ["No difference", "COUNT(*) counts all rows; COUNT(col) counts non-NULL values", "COUNT(col) is faster", "COUNT(*) only counts distinct rows"], "answerIndex": 1 },
              { "question": "Which clause filters results AFTER aggregation?", "options": ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], "answerIndex": 1 },
              { "question": "If Marks has values 80, 90, NULL, 70 — what does AVG(Marks) return?", "options": ["60.0", "80.0", "85.0", "57.5"], "answerIndex": 1 },
              { "question": "Which of the following is INVALID when using GROUP BY?", "options": ["SELECT Dept, COUNT(*) FROM STUDENT GROUP BY Dept", "SELECT Dept, Name, COUNT(*) FROM STUDENT GROUP BY Dept", "SELECT Dept, MAX(Age) FROM STUDENT GROUP BY Dept", "SELECT Dept, AVG(Age) FROM STUDENT GROUP BY Dept"], "answerIndex": 1 },
              { "question": "Which query finds courses with average marks above 75?", "options": ["SELECT Course_ID FROM MARKS WHERE AVG(Marks) > 75", "SELECT Course_ID, AVG(Marks) FROM MARKS GROUP BY Course_ID HAVING AVG(Marks) > 75", "SELECT Course_ID, AVG(Marks) FROM MARKS HAVING AVG(Marks) > 75", "SELECT Course_ID FROM MARKS GROUP BY AVG(Marks) > 75"], "answerIndex": 1 }
            ],
            "procedure": [
              "Open the Code Test tab — STUDENT and MARKS tables are pre-populated",
              "Run COUNT(*): SELECT COUNT(*) AS Total_Students FROM STUDENT",
              "Run GROUP BY: SELECT Dept_Name, COUNT(*) FROM STUDENT GROUP BY Dept_Name",
              "Run AVG on MARKS grouped by Course_ID",
              "Run MAX and MIN on Marks column",
              "Add a HAVING clause to filter departments with fewer than 2 students",
              "Insert a row with NULL Marks and observe how AVG changes",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- (a) Count students per department\nSELECT Dept_Name, COUNT(*) AS Student_Count\nFROM STUDENT\nGROUP BY Dept_Name;\n\n-- (b) Average marks per course\nSELECT Course_ID, ROUND(AVG(Marks),2) AS Avg_Marks\nFROM MARKS\nGROUP BY Course_ID;\n\n-- (c) Highest and lowest marks overall\nSELECT MAX(Marks) AS Highest, MIN(Marks) AS Lowest, ROUND(AVG(Marks),2) AS Average\nFROM MARKS;\n\n-- (d) Total marks per student (SUM)\nSELECT S.Roll_No, S.Name, SUM(M.Marks) AS Total_Marks\nFROM STUDENT S JOIN MARKS M ON S.Roll_No = M.Roll_No\nGROUP BY S.Roll_No, S.Name;\n\n-- HAVING: departments with more than 1 student\nSELECT Dept_Name, COUNT(*) AS Cnt\nFROM STUDENT\nGROUP BY Dept_Name\nHAVING COUNT(*) > 1;",
              "steps": [
                { "line": 1, "annotation": "GROUP BY Dept_Name — each department name forms one group", "memory": [], "output": "CSE:2, IT:2, ECE:1" },
                { "line": 2, "annotation": "AVG(Marks) computed per course group", "memory": [], "output": "CS101: AVG=77.20" },
                { "line": 3, "annotation": "MAX and MIN scan all marks rows", "memory": [], "output": "Highest:91, Lowest:60, Average:77.20" },
                { "line": 4, "annotation": "SUM per student after JOIN", "memory": [], "output": "Alice:85, Bob:72, Carol:91, David:60, Amy:78" },
                { "line": 5, "annotation": "HAVING filters ECE (count=1) — only CSE(2) and IT(2) remain", "memory": [], "output": "CSE:2, IT:2" }
              ]
            },
            "posttest": [
              { "question": "What does COUNT(DISTINCT Dept_Name) return for the sample STUDENT data?", "options": ["5", "3", "2", "1"], "answerIndex": 1 },
              { "question": "If one student's Marks is NULL, which aggregate changes?", "options": ["Only COUNT(*)", "Only AVG and SUM; COUNT(*) stays the same", "All aggregates change equally", "None change"], "answerIndex": 1 },
              { "question": "What is wrong with: SELECT Dept_Name, Name, COUNT(*) FROM STUDENT GROUP BY Dept_Name?", "options": ["COUNT(*) is wrong", "Name must also appear in GROUP BY or an aggregate", "GROUP BY should use Count", "Nothing is wrong"], "answerIndex": 1 },
              { "question": "Which query finds the department with the highest average age?", "options": ["SELECT Dept_Name, MAX(AVG(Age)) FROM STUDENT GROUP BY Dept_Name", "SELECT Dept_Name, AVG(Age) AS A FROM STUDENT GROUP BY Dept_Name ORDER BY A DESC LIMIT 1", "SELECT Dept_Name FROM STUDENT HAVING MAX(Age)", "SELECT MAX(Age), Dept_Name FROM STUDENT"], "answerIndex": 1 },
              { "question": "HAVING COUNT(*) > 1 versus WHERE COUNT(*) > 1 — what is the difference?", "options": ["No difference in result", "HAVING works after grouping; WHERE does not allow aggregate functions", "WHERE is faster", "HAVING filters individual rows; WHERE filters groups"], "answerIndex": 1 }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 3: Introduction to SQL (Section 3.6 on Aggregate Functions)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.5 on Aggregate Functions)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: Aggregate Functions and Grouping",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 12: SQL — Aggregate Functions",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Aggregate Functions"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 5",
      "objective": "GROUP BY, HAVING, ORDER BY and creating tables with relationships",
      "tutorial": "Tutorial 5: Grouping, Ordering, and Relationships",
      "labTitle": "Lab 5: Advanced Grouping and Sorting",
      "experiments": [
        {
          "id": "db-w5-1",
          "title": "GROUP BY and HAVING",
          "desc": "On the STUDENT-MARKS database: (a) Find departments with more than 1 student, (b) Find courses where average marks > 75, (c) Find students who have appeared in more than one course, (d) Find the highest average marks department.",
          "expected": "Grouped results with correct filtering using HAVING; ORDER BY applied to group results",
          "content": {
            "aim": {
              "text": "In this experiment, the student will master GROUP BY and HAVING clauses to produce grouped summaries and filter those groups. The student will:",
              "bullets": [
                "Group rows by one or multiple columns using GROUP BY",
                "Apply aggregate functions (COUNT, AVG, SUM, MAX, MIN) to each group",
                "Filter groups using HAVING with aggregate conditions",
                "Distinguish clearly between WHERE (row-level filter) and HAVING (group-level filter)",
                "Combine GROUP BY with JOIN, ORDER BY, and LIMIT"
              ]
            },
            "theory": [
              {
                "title": "GROUP BY Clause",
                "body": [
                  "GROUP BY col1, col2 collapses rows with identical values in the grouped columns into a single summary row.",
                  "All columns in the SELECT list must either appear in GROUP BY or be wrapped in an aggregate function.",
                  "Query execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."
                ]
              },
              {
                "title": "HAVING vs WHERE",
                "body": [
                  "WHERE filters individual rows BEFORE grouping — it cannot reference aggregate functions.",
                  "HAVING filters groups AFTER aggregation — it can reference aggregate functions.",
                  "Example: WHERE Marks > 50 removes individual marks rows before grouping.",
                  "Example: HAVING AVG(Marks) > 75 removes groups whose average is 75 or below."
                ]
              },
              {
                "title": "Multi-column GROUP BY",
                "body": [
                  "GROUP BY Dept_Name, Course_ID creates one group per unique (Dept, Course) combination.",
                  "Useful for cross-tabulation: average marks per department per course."
                ]
              },
              {
                "title": "ORDER BY with GROUP BY",
                "body": [
                  "ORDER BY can reference aggregated columns or aliases defined in SELECT.",
                  "Example: SELECT Dept_Name, AVG(Age) AS Avg_Age FROM STUDENT GROUP BY Dept_Name ORDER BY Avg_Age DESC;",
                  "LIMIT n restricts the result to n rows — combined with ORDER BY it gives top-N queries."
                ]
              }
            ],
            "pretest": [
              {
                "question": "In what order does SQL evaluate GROUP BY and WHERE?",
                "options": [
                  "GROUP BY, then WHERE",
                  "WHERE, then GROUP BY",
                  "Simultaneously",
                  "Depends on the database"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which query is valid?",
                "options": [
                  "SELECT Dept, Name FROM STUDENT GROUP BY Dept",
                  "SELECT Dept, COUNT(*) FROM STUDENT GROUP BY Dept HAVING COUNT(*) > 1",
                  "SELECT Dept FROM STUDENT WHERE COUNT(*) > 1",
                  "SELECT Dept, AVG(Marks) FROM STUDENT GROUP BY Dept WHERE AVG(Marks) > 70"
                ],
                "answerIndex": 1
              },
              {
                "question": "How many result rows does GROUP BY Dept_Name return if there are 3 distinct departments?",
                "options": [
                  "5 (one per student)",
                  "3 (one per department)",
                  "1 (grand total)",
                  "Depends on HAVING"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which clause finds the department with the highest average marks?",
                "options": [
                  "WHERE MAX(AVG(Marks))",
                  "HAVING MAX(Marks)",
                  "ORDER BY AVG(Marks) DESC LIMIT 1",
                  "GROUP BY MAX(Marks)"
                ],
                "answerIndex": 2
              },
              {
                "question": "HAVING COUNT(*) >= 2 on a grouped result will:",
                "options": [
                  "Filter rows where count ≥ 2",
                  "Filter groups where count ≥ 2",
                  "Return all rows",
                  "Raise an error — HAVING cannot use COUNT"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Open the Code Test tab with pre-populated STUDENT and MARKS tables",
              "Run: SELECT Dept_Name, COUNT(*) FROM STUDENT GROUP BY Dept_Name HAVING COUNT(*) > 1",
              "Run: SELECT Course_ID, AVG(Marks) FROM MARKS GROUP BY Course_ID HAVING AVG(Marks) > 75",
              "Run: SELECT Roll_No, COUNT(Course_ID) AS Courses_Taken FROM MARKS GROUP BY Roll_No HAVING COUNT(Course_ID) > 1",
              "Run the top-department query using ORDER BY AVG(Marks) DESC LIMIT 1",
              "Add a WHERE clause before GROUP BY (e.g. WHERE Marks > 50) and observe how it differs from HAVING",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Extended MARKS data with multiple courses\nINSERT INTO MARKS VALUES\n  (101,'CS102',78),(102,'CS102',65),(103,'CS102',88),\n  (101,'CS103',90),(103,'CS103',72);\n\n-- (a) Departments with more than 1 student\nSELECT Dept_Name, COUNT(*) AS Cnt\nFROM STUDENT GROUP BY Dept_Name HAVING COUNT(*) > 1;\n\n-- (b) Courses with avg marks > 75\nSELECT Course_ID, ROUND(AVG(Marks),2) AS Avg_Marks\nFROM MARKS GROUP BY Course_ID HAVING AVG(Marks) > 75;\n\n-- (c) Students in more than 1 course\nSELECT Roll_No, COUNT(DISTINCT Course_ID) AS Num_Courses\nFROM MARKS GROUP BY Roll_No HAVING COUNT(DISTINCT Course_ID) > 1;\n\n-- (d) Department with highest avg marks (via join)\nSELECT S.Dept_Name, ROUND(AVG(M.Marks),2) AS Dept_Avg\nFROM STUDENT S JOIN MARKS M ON S.Roll_No=M.Roll_No\nGROUP BY S.Dept_Name\nORDER BY Dept_Avg DESC LIMIT 1;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "Extended MARKS with 3 courses; some students in multiple courses",
                  "memory": [],
                  "output": "MARKS now has 10 rows across CS101, CS102, CS103"
                },
                {
                  "line": 2,
                  "annotation": "GROUP BY Dept_Name; HAVING removes ECE (count=1)",
                  "memory": [],
                  "output": "CSE:2, IT:2"
                },
                {
                  "line": 3,
                  "annotation": "GROUP BY Course_ID; CS101 avg=77.2, CS102 avg=77.0, CS103 avg=81.0",
                  "memory": [],
                  "output": "CS101:77.20, CS103:81.00 pass; CS102 avg=77.0 also passes > 75"
                },
                {
                  "line": 4,
                  "annotation": "Students 101 and 103 appear in 3 courses each; 102,104,105 appear in 1-2",
                  "memory": [],
                  "output": "Roll 101: 3 courses, Roll 103: 3 courses"
                },
                {
                  "line": 5,
                  "annotation": "CSE avg computed from Alice and Carol marks; ordered DESC; top 1 returned",
                  "memory": [],
                  "output": "CSE dept avg is highest"
                }
              ]
            },
            "posttest": [
              {
                "question": "What is wrong with: SELECT Dept, AVG(Marks) FROM MARKS WHERE AVG(Marks)>70 GROUP BY Dept?",
                "options": [
                  "Nothing wrong",
                  "WHERE cannot use AVG — use HAVING instead",
                  "GROUP BY must come before WHERE",
                  "AVG cannot be used with Dept"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which query finds departments where ALL students scored above 60?",
                "options": [
                  "SELECT Dept FROM STUDENT WHERE Marks > 60",
                  "SELECT S.Dept_Name FROM STUDENT S JOIN MARKS M ON S.Roll_No=M.Roll_No GROUP BY S.Dept_Name HAVING MIN(M.Marks) > 60",
                  "SELECT Dept FROM MARKS GROUP BY Dept HAVING Marks > 60",
                  "SELECT Dept FROM STUDENT HAVING MIN(Marks) > 60"
                ],
                "answerIndex": 1
              },
              {
                "question": "SELECT Dept_Name, COUNT(*) FROM STUDENT GROUP BY Dept_Name ORDER BY COUNT(*) DESC LIMIT 2 — what does this return?",
                "options": [
                  "Top 2 students",
                  "2 departments with fewest students",
                  "2 departments with most students",
                  "All departments, top 2 marks"
                ],
                "answerIndex": 2
              },
              {
                "question": "Can HAVING reference a column alias defined in SELECT?",
                "options": [
                  "Always yes",
                  "Always no",
                  "Yes in most databases; no in strict SQL standard",
                  "Only for numeric aliases"
                ],
                "answerIndex": 2
              },
              {
                "question": "GROUP BY Dept_Name, Course_ID on STUDENT-MARKS creates groups based on:",
                "options": [
                  "Department only",
                  "Course only",
                  "Each unique department-course combination",
                  "Student and course"
                ],
                "answerIndex": 2
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 3: Introduction to SQL (Section 3.7 on GROUP BY and HAVING)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.6 on GROUP BY and HAVING)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: GROUP BY and HAVING Clauses",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 12: SQL — GROUP BY and HAVING",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Grouping Data with GROUP BY and HAVING"
              ]
          }
        },
        {
          "id": "db-w5-2",
          "title": "ORDER BY, LIMIT, and DISTINCT",
          "desc": "Queries on STUDENT and MARKS: (a) List students alphabetically, (b) Find top 3 students by total marks, (c) List distinct departments, (d) Sort departments by student count descending, (e) Use OFFSET with LIMIT for pagination.",
          "expected": "Results correctly sorted, limited, and deduplicated",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply ORDER BY, LIMIT, OFFSET, and DISTINCT to control result ordering and size. The student will:",
              "bullets": [
                "Sort query results ascending (ASC) and descending (DESC) using ORDER BY",
                "Sort by multiple columns with different sort directions",
                "Use LIMIT to restrict result size and OFFSET for pagination",
                "Use DISTINCT to eliminate duplicate rows in results",
                "Combine these clauses with GROUP BY and aggregate functions"
              ]
            },
            "theory": [
              {
                "title": "ORDER BY Clause",
                "body": [
                  "ORDER BY col1 [ASC|DESC], col2 [ASC|DESC] sorts the final result set.",
                  "ASC (ascending) is the default; DESC (descending) must be specified.",
                  "ORDER BY can reference column names, aliases, or column positions: ORDER BY 2 DESC sorts by the second column.",
                  "NULL values sort LAST in ASC order and FIRST in DESC in SQLite (standard varies by DBMS)."
                ]
              },
              {
                "title": "LIMIT and OFFSET",
                "body": [
                  "LIMIT n returns at most n rows.",
                  "LIMIT n OFFSET m skips the first m rows, then returns n rows — used for pagination.",
                  "Example: Page 2 of 3 rows per page: LIMIT 3 OFFSET 3.",
                  "Always pair LIMIT with ORDER BY for deterministic results."
                ]
              },
              {
                "title": "DISTINCT",
                "body": [
                  "SELECT DISTINCT col1, col2 eliminates duplicate rows from the result.",
                  "DISTINCT applies to the combination of all selected columns.",
                  "SELECT DISTINCT Dept_Name from STUDENT returns each department name once.",
                  "COUNT(DISTINCT col) counts unique non-NULL values."
                ]
              }
            ],
            "pretest": [
              {
                "question": "What is the default sort order for ORDER BY?",
                "options": [
                  "DESC",
                  "ASC",
                  "Insertion order",
                  "Random"
                ],
                "answerIndex": 1
              },
              {
                "question": "How do you retrieve records 6 through 10 using LIMIT and OFFSET?",
                "options": [
                  "LIMIT 10 OFFSET 5",
                  "LIMIT 5 OFFSET 6",
                  "LIMIT 5 OFFSET 5",
                  "LIMIT 6 OFFSET 10"
                ],
                "answerIndex": 2
              },
              {
                "question": "SELECT DISTINCT Dept_Name FROM STUDENT — if there are 5 students in 3 departments, how many rows?",
                "options": [
                  "5",
                  "3",
                  "1",
                  "0"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which query returns the student with the lowest marks?",
                "options": [
                  "SELECT * FROM MARKS ORDER BY Marks ASC LIMIT 1",
                  "SELECT * FROM MARKS ORDER BY Marks DESC LIMIT 1",
                  "SELECT MIN(Marks) FROM MARKS LIMIT 1",
                  "SELECT * FROM MARKS WHERE Marks = MIN(Marks)"
                ],
                "answerIndex": 0
              },
              {
                "question": "ORDER BY 2 DESC means:",
                "options": [
                  "Sort by the value 2 descending",
                  "Sort by the second column in the SELECT list descending",
                  "Sort 2 rows descending",
                  "Error"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Open the Code Test tab with pre-populated STUDENT and MARKS tables",
              "Run: SELECT * FROM STUDENT ORDER BY Name ASC",
              "Run: SELECT Roll_No, SUM(Marks) AS Total FROM MARKS GROUP BY Roll_No ORDER BY Total DESC LIMIT 3",
              "Run: SELECT DISTINCT Dept_Name FROM STUDENT ORDER BY Dept_Name",
              "Run: SELECT Dept_Name, COUNT(*) AS Cnt FROM STUDENT GROUP BY Dept_Name ORDER BY Cnt DESC",
              "Implement pagination: LIMIT 2 OFFSET 0 (page 1), LIMIT 2 OFFSET 2 (page 2)",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- (a) Alphabetical order\nSELECT Roll_No, Name, Dept_Name FROM STUDENT ORDER BY Name ASC;\n\n-- (b) Top 3 students by total marks\nSELECT S.Roll_No, S.Name, SUM(M.Marks) AS Total\nFROM STUDENT S JOIN MARKS M ON S.Roll_No=M.Roll_No\nGROUP BY S.Roll_No, S.Name\nORDER BY Total DESC\nLIMIT 3;\n\n-- (c) Distinct departments\nSELECT DISTINCT Dept_Name FROM STUDENT ORDER BY Dept_Name;\n\n-- (d) Departments by student count desc\nSELECT Dept_Name, COUNT(*) AS Cnt\nFROM STUDENT GROUP BY Dept_Name ORDER BY Cnt DESC;\n\n-- (e) Pagination: page 2 (rows 3-4)\nSELECT Roll_No, Name FROM STUDENT ORDER BY Roll_No LIMIT 2 OFFSET 2;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "ORDER BY Name ASC — alphabetical sort",
                  "memory": [],
                  "output": "Alice, Amy, Bob, Carol, David"
                },
                {
                  "line": 2,
                  "annotation": "SUM per student, sorted desc; top 3 returned",
                  "memory": [],
                  "output": "Carol(top), Alice, Amy — based on total across all courses"
                },
                {
                  "line": 3,
                  "annotation": "DISTINCT reduces 5 student rows to 3 unique departments",
                  "memory": [],
                  "output": "CSE, ECE, IT"
                },
                {
                  "line": 4,
                  "annotation": "Sorted by count descending: CSE=2, IT=2, ECE=1",
                  "memory": [],
                  "output": "CSE:2, IT:2, ECE:1"
                },
                {
                  "line": 5,
                  "annotation": "OFFSET 2 skips first 2 rows; LIMIT 2 returns next 2",
                  "memory": [],
                  "output": "Row 3: Carol(103), Row 4: David(104)"
                }
              ]
            },
            "posttest": [
              {
                "question": "What does SELECT DISTINCT Dept_Name, Age FROM STUDENT return?",
                "options": [
                  "Unique department names only",
                  "Unique combinations of Dept_Name and Age",
                  "Unique ages only",
                  "All rows of STUDENT"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which query gives the second highest total marks?",
                "options": [
                  "SELECT SUM(Marks) FROM MARKS ORDER BY SUM(Marks) DESC LIMIT 1 OFFSET 1",
                  "SELECT Roll_No, SUM(Marks) AS T FROM MARKS GROUP BY Roll_No ORDER BY T DESC LIMIT 1 OFFSET 1",
                  "SELECT MAX(SUM(Marks)) FROM MARKS",
                  "SELECT SUM(Marks) FROM MARKS LIMIT 2"
                ],
                "answerIndex": 1
              },
              {
                "question": "ORDER BY Name ASC, Age DESC means:",
                "options": [
                  "Sort by Name ascending, then by Age descending for ties",
                  "Sort by Age first",
                  "Sort descending by both",
                  "Error: cannot mix ASC and DESC"
                ],
                "answerIndex": 0
              },
              {
                "question": "If STUDENT has 10 rows, what does LIMIT 5 OFFSET 10 return?",
                "options": [
                  "Rows 10-15",
                  "0 rows (offset exceeds row count)",
                  "Rows 5-10",
                  "All 10 rows"
                ],
                "answerIndex": 1
              },
              {
                "question": "Why should ORDER BY always be used with LIMIT?",
                "options": [
                  "LIMIT requires ORDER BY by SQL standard",
                  "Without ORDER BY, which rows are returned is undefined",
                  "ORDER BY doubles query speed",
                  "LIMIT without ORDER BY returns NULL rows"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 3: Introduction to SQL (Section 3.5 on ORDER BY and DISTINCT)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.4 on ORDER BY)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: ORDER BY and DISTINCT Clauses",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — ORDER BY and DISTINCT",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Sorting and Eliminating Duplicates"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 6",
      "objective": "Implementation of different types of SQL Joins",
      "tutorial": "Tutorial 6: SQL JOINs — Types and Usage",
      "labTitle": "Lab 6: Join Operations in SQL",
      "experiments": [
        {
          "id": "db-w6-1",
          "title": "INNER JOIN and LEFT JOIN",
          "desc": "On STUDENT, DEPARTMENT, MARKS tables: (a) INNER JOIN to list students with their department names and marks, (b) LEFT JOIN to find students with no marks recorded, (c) Show difference in row counts between INNER and LEFT JOIN.",
          "expected": "INNER JOIN returns only matched rows; LEFT JOIN includes unmatched STUDENT rows with NULLs in MARKS columns",
          "content": {
            "aim": {
              "text": "In this experiment, the student will implement and compare INNER JOIN and LEFT JOIN operations. The student will:",
              "bullets": [
                "Write INNER JOIN to retrieve rows with matches in both tables",
                "Write LEFT OUTER JOIN to include all rows from the left table",
                "Identify unmatched rows using IS NULL on right-table columns",
                "Use table aliases to simplify multi-table queries",
                "Join more than two tables in a single query"
              ]
            },
            "theory": [
              {
                "title": "INNER JOIN",
                "body": [
                  "INNER JOIN returns only those rows where the join condition is satisfied in BOTH tables.",
                  "Syntax: SELECT ... FROM T1 INNER JOIN T2 ON T1.key = T2.key;",
                  "Rows in T1 with no matching row in T2 are excluded from the result, and vice versa.",
                  "INNER JOIN is the default JOIN type — writing just JOIN is equivalent."
                ]
              },
              {
                "title": "LEFT OUTER JOIN",
                "body": [
                  "LEFT JOIN returns ALL rows from the left table plus matched rows from the right table.",
                  "For left-table rows with no match in the right table, right-table columns are filled with NULL.",
                  "Syntax: SELECT ... FROM T1 LEFT JOIN T2 ON T1.key = T2.key;",
                  "Use case: Find all students, including those who have not enrolled in any course."
                ]
              },
              {
                "title": "Finding Unmatched Rows",
                "body": [
                  "Pattern: LEFT JOIN + WHERE right.col IS NULL — returns only the unmatched left rows.",
                  "Example: SELECT S.* FROM STUDENT S LEFT JOIN MARKS M ON S.Roll_No = M.Roll_No WHERE M.Roll_No IS NULL;",
                  "This finds students with no marks record — equivalent to: NOT IN (SELECT Roll_No FROM MARKS)."
                ]
              },
              {
                "title": "Table Aliases",
                "body": [
                  "Aliases shorten table names: FROM STUDENT S means S is now an alias for STUDENT.",
                  "Required for self-joins (to distinguish two references to the same table).",
                  "Column references use alias: S.Roll_No, M.Marks."
                ]
              }
            ],
            "pretest": [
              {
                "question": "INNER JOIN returns:",
                "options": [
                  "All rows from both tables",
                  "Only matched rows from both tables",
                  "All rows from left table",
                  "All rows from right table"
                ],
                "answerIndex": 1
              },
              {
                "question": "LEFT JOIN returns unmatched left rows with:",
                "options": [
                  "0 in right-table columns",
                  "Deleted right rows",
                  "NULL in right-table columns",
                  "Error"
                ],
                "answerIndex": 2
              },
              {
                "question": "How do you find students NOT in the MARKS table using LEFT JOIN?",
                "options": [
                  "WHERE M.Marks > 0",
                  "WHERE M.Roll_No IS NULL",
                  "WHERE M.Roll_No IS NOT NULL",
                  "WHERE S.Roll_No IS NULL"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which is the default JOIN type when you write just JOIN?",
                "options": [
                  "LEFT JOIN",
                  "RIGHT JOIN",
                  "INNER JOIN",
                  "CROSS JOIN"
                ],
                "answerIndex": 2
              },
              {
                "question": "A JOIN between STUDENT (5 rows) and MARKS (3 rows) where 3 students have marks — INNER JOIN returns:",
                "options": [
                  "5 rows",
                  "3 rows",
                  "8 rows",
                  "15 rows"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Open the Code Test tab — insert one student with no marks to demonstrate LEFT JOIN",
              "Run INNER JOIN: SELECT S.Name, S.Dept_Name, M.Course_ID, M.Marks FROM STUDENT S INNER JOIN MARKS M ON S.Roll_No=M.Roll_No",
              "Observe that students with no marks are excluded",
              "Run LEFT JOIN: same query with LEFT JOIN",
              "Observe NULLs in Course_ID and Marks for the student with no record",
              "Run the unmatched pattern: WHERE M.Roll_No IS NULL",
              "Count rows from each join and compare",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Add a student with no marks\nINSERT INTO STUDENT VALUES (106,'Eve',21,'CSE','eve@edu.in');\n-- Eve has no rows in MARKS\n\n-- INNER JOIN (Eve excluded)\nSELECT S.Roll_No, S.Name, M.Course_ID, M.Marks\nFROM STUDENT S\nINNER JOIN MARKS M ON S.Roll_No = M.Roll_No;\n\n-- LEFT JOIN (Eve included with NULLs)\nSELECT S.Roll_No, S.Name, M.Course_ID, M.Marks\nFROM STUDENT S\nLEFT JOIN MARKS M ON S.Roll_No = M.Roll_No;\n\n-- Students with NO marks\nSELECT S.Roll_No, S.Name\nFROM STUDENT S\nLEFT JOIN MARKS M ON S.Roll_No = M.Roll_No\nWHERE M.Roll_No IS NULL;\n\n-- Three-table join: Student + Dept (via Dept_Name) + Marks\nSELECT S.Name, S.Dept_Name, M.Course_ID, M.Marks\nFROM STUDENT S\nJOIN MARKS M ON S.Roll_No = M.Roll_No\nORDER BY S.Name, M.Course_ID;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "Eve (Roll_No=106) inserted into STUDENT but not MARKS",
                  "memory": [],
                  "output": "STUDENT: 6 rows. MARKS: unchanged (5 students, multiple courses)"
                },
                {
                  "line": 2,
                  "annotation": "INNER JOIN: Eve has no MARKS row — excluded. All others matched.",
                  "memory": [],
                  "output": "5 students × their marks rows — Eve absent"
                },
                {
                  "line": 3,
                  "annotation": "LEFT JOIN: Eve appears with Course_ID=NULL, Marks=NULL",
                  "memory": [],
                  "output": "All mark rows + Eve row: (106, Eve, NULL, NULL)"
                },
                {
                  "line": 4,
                  "annotation": "WHERE M.Roll_No IS NULL isolates the unmatched row",
                  "memory": [],
                  "output": "(106, Eve) — the only student with no marks"
                },
                {
                  "line": 5,
                  "annotation": "Three-table join chains two JOINs sequentially",
                  "memory": [],
                  "output": "Name, Dept, Course, Marks for every enrolled student"
                }
              ]
            },
            "posttest": [
              {
                "question": "How many rows does LEFT JOIN return if STUDENT has 6 rows and MARKS has 10 rows (5 students with marks, 1 without)?",
                "options": [
                  "6",
                  "10",
                  "11",
                  "Depends on duplicates in MARKS"
                ],
                "answerIndex": 3
              },
              {
                "question": "Which pattern finds records in STUDENT but NOT in MARKS?",
                "options": [
                  "INNER JOIN WHERE M.Roll_No IS NULL",
                  "LEFT JOIN WHERE M.Roll_No IS NULL",
                  "RIGHT JOIN WHERE S.Roll_No IS NULL",
                  "FULL JOIN WHERE M.Roll_No IS NOT NULL"
                ],
                "answerIndex": 1
              },
              {
                "question": "What is the result of INNER JOIN when one table is empty?",
                "options": [
                  "All rows from the non-empty table",
                  "All rows from the empty table",
                  "0 rows",
                  "Error"
                ],
                "answerIndex": 2
              },
              {
                "question": "In the query SELECT S.Name, M.Marks FROM STUDENT S LEFT JOIN MARKS M ON S.Roll_No=M.Roll_No, what appears in M.Marks for a student with no mark record?",
                "options": [
                  "0",
                  "Empty string",
                  "NULL",
                  "Error"
                ],
                "answerIndex": 2
              },
              {
                "question": "Which of the following is equivalent to INNER JOIN?",
                "options": [
                  "FULL JOIN",
                  "CROSS JOIN",
                  "JOIN (without qualifier)",
                  "OUTER JOIN"
                ],
                "answerIndex": 2
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.1 on Join Expressions)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.2 on Joins)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: JOIN Operations in SQL",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — JOIN Operations",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: INNER and OUTER JOINs"
              ]
          }
        },
        {
          "id": "db-w6-2",
          "title": "RIGHT JOIN, FULL OUTER JOIN, and SELF JOIN",
          "desc": "(a) RIGHT JOIN to find courses with no enrolled students, (b) Simulate FULL OUTER JOIN using UNION of LEFT and RIGHT JOIN, (c) SELF JOIN on EMPLOYEE table to find employee-manager name pairs.",
          "expected": "RIGHT JOIN unmatched rows have NULLs on left; FULL JOIN union includes all unmatched from both sides; SELF JOIN correctly pairs employees with managers",
          "content": {
            "aim": {
              "text": "In this experiment, the student will implement RIGHT JOIN, FULL OUTER JOIN (via UNION), and SELF JOIN. The student will:",
              "bullets": [
                "Apply RIGHT OUTER JOIN to retain all right-table rows",
                "Simulate FULL OUTER JOIN by unioning LEFT JOIN and RIGHT JOIN results",
                "Apply SELF JOIN to query hierarchical or recursive relationships within a single table",
                "Use RENAME (table aliases) to distinguish two references to the same table in a self-join",
                "Understand when each join type is appropriate"
              ]
            },
            "theory": [
              {
                "title": "RIGHT OUTER JOIN",
                "body": [
                  "RIGHT JOIN returns ALL rows from the right table and matched rows from the left table.",
                  "For right-table rows with no match in the left table, left-table columns are NULL.",
                  "Syntax: SELECT ... FROM T1 RIGHT JOIN T2 ON T1.key = T2.key;",
                  "Note: SQLite does not natively support RIGHT JOIN — simulate with LEFT JOIN by swapping table order."
                ]
              },
              {
                "title": "FULL OUTER JOIN",
                "body": [
                  "FULL OUTER JOIN returns all rows from both tables — matched rows are combined; unmatched rows from either side have NULLs for the other table's columns.",
                  "SQLite does not support FULL OUTER JOIN — simulate: (T1 LEFT JOIN T2) UNION (T2 LEFT JOIN T1).",
                  "Use case: Find all students AND all courses, showing which combinations exist."
                ]
              },
              {
                "title": "SELF JOIN",
                "body": [
                  "A self-join joins a table to itself. Requires two aliases to distinguish the two references.",
                  "Use case: EMPLOYEE table with Mgr_ID referencing another Emp_ID in the same table.",
                  "Syntax: SELECT E.Name AS Employee, M.Name AS Manager FROM EMPLOYEE E JOIN EMPLOYEE M ON E.Mgr_ID = M.Emp_ID;",
                  "An INNER self-join excludes employees without a manager (e.g. the CEO). Use LEFT self-join to include them."
                ]
              }
            ],
            "pretest": [
              {
                "question": "RIGHT JOIN returns unmatched rows from which table?",
                "options": [
                  "Left table",
                  "Right table",
                  "Both tables",
                  "Neither"
                ],
                "answerIndex": 1
              },
              {
                "question": "How is FULL OUTER JOIN simulated in SQLite?",
                "options": [
                  "CROSS JOIN + WHERE",
                  "INNER JOIN + WHERE IS NULL",
                  "LEFT JOIN UNION RIGHT JOIN (or LEFT JOIN with swapped tables)",
                  "SELF JOIN"
                ],
                "answerIndex": 2
              },
              {
                "question": "In a SELF JOIN on EMPLOYEE, why are two aliases needed?",
                "options": [
                  "SQL requires it for all joins",
                  "To distinguish two roles of the same table (employee vs manager)",
                  "Aliases speed up the query",
                  "To avoid primary key conflicts"
                ],
                "answerIndex": 1
              },
              {
                "question": "T1 LEFT JOIN T2 UNION T2 LEFT JOIN T1 simulates:",
                "options": [
                  "INNER JOIN",
                  "CROSS JOIN",
                  "FULL OUTER JOIN",
                  "SELF JOIN"
                ],
                "answerIndex": 2
              },
              {
                "question": "A SELF JOIN INNER JOIN on Mgr_ID = Emp_ID will exclude:",
                "options": [
                  "Employees with a manager",
                  "Employees without a manager (NULL Mgr_ID)",
                  "Managers",
                  "All rows"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Create a COURSE table and insert some courses; ensure one course has no students enrolled",
              "Simulate RIGHT JOIN (courses with no students) using: SELECT C.*, M.Roll_No FROM MARKS M RIGHT JOIN COURSE C ON M.Course_ID=C.Course_ID — or simulate in SQLite by reversing LEFT JOIN",
              "Simulate FULL OUTER JOIN using UNION",
              "Create EMPLOYEE(Emp_ID, Name, Salary, Mgr_ID) with hierarchical data",
              "Run SELF JOIN to pair employees with their managers",
              "Use LEFT self-join to include the top-level employee (CEO) with NULL manager",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Simulate RIGHT JOIN in SQLite (swap table order in LEFT JOIN)\n-- Courses with no enrolled students:\nSELECT C.Course_ID, C.Title, M.Roll_No\nFROM MARKS M\nRIGHT JOIN COURSE C ON M.Course_ID = C.Course_ID\nWHERE M.Roll_No IS NULL;\n-- SQLite equivalent (swap tables):\nSELECT C.Course_ID, C.Title, M.Roll_No\nFROM COURSE C\nLEFT JOIN MARKS M ON C.Course_ID = M.Course_ID\nWHERE M.Roll_No IS NULL;\n\n-- Simulate FULL OUTER JOIN\nSELECT S.Roll_No, S.Name, M.Course_ID\nFROM STUDENT S LEFT JOIN MARKS M ON S.Roll_No=M.Roll_No\nUNION\nSELECT S.Roll_No, S.Name, M.Course_ID\nFROM MARKS M LEFT JOIN STUDENT S ON M.Roll_No=S.Roll_No;\n\n-- SELF JOIN on EMPLOYEE\nCREATE TABLE EMPLOYEE(\n  Emp_ID INT PRIMARY KEY, Name VARCHAR(50),\n  Salary INT, Mgr_ID INT REFERENCES EMPLOYEE(Emp_ID));\nINSERT INTO EMPLOYEE VALUES\n  (1,'Alice',90000,NULL),(2,'Bob',70000,1),(3,'Carol',65000,1),(4,'Dave',55000,2);\n-- Inner self-join (CEO excluded)\nSELECT E.Name AS Employee, M.Name AS Manager\nFROM EMPLOYEE E JOIN EMPLOYEE M ON E.Mgr_ID = M.Emp_ID;\n-- Left self-join (CEO included)\nSELECT E.Name AS Employee, COALESCE(M.Name,'No Manager') AS Manager\nFROM EMPLOYEE E LEFT JOIN EMPLOYEE M ON E.Mgr_ID = M.Emp_ID;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "Courses with no MARKS rows have NULL Roll_No after LEFT JOIN — these are unregistered courses",
                  "memory": [],
                  "output": "CS104 (if not in MARKS): (CS104, Algorithms, NULL)"
                },
                {
                  "line": 2,
                  "annotation": "FULL OUTER JOIN UNION: both unmatched students and unmatched courses appear",
                  "memory": [],
                  "output": "All students + all courses; unmatched on either side show NULL on the other"
                },
                {
                  "line": 3,
                  "annotation": "SELF JOIN: E is employee alias, M is manager alias; join on Mgr_ID=Emp_ID",
                  "memory": [],
                  "output": "Bob→Alice, Carol→Alice, Dave→Bob (Alice excluded — no manager)"
                },
                {
                  "line": 4,
                  "annotation": "LEFT self-join includes Alice with COALESCE showing 'No Manager'",
                  "memory": [],
                  "output": "Alice→No Manager, Bob→Alice, Carol→Alice, Dave→Bob"
                }
              ]
            },
            "posttest": [
              {
                "question": "SELECT * FROM A RIGHT JOIN B ON A.id=B.id WHERE A.id IS NULL returns:",
                "options": [
                  "Rows in A with no match in B",
                  "Rows in B with no match in A",
                  "All matched rows",
                  "All rows from both"
                ],
                "answerIndex": 1
              },
              {
                "question": "Why does SQLite not support RIGHT JOIN natively?",
                "options": [
                  "It is not SQL standard",
                  "RIGHT JOIN can always be rewritten as a LEFT JOIN by reversing table order",
                  "RIGHT JOIN is slower",
                  "SQLite only supports INNER JOIN"
                ],
                "answerIndex": 1
              },
              {
                "question": "SELF JOIN is commonly used for:",
                "options": [
                  "Joining two identical databases",
                  "Hierarchical queries within a single table",
                  "Combining two result sets",
                  "Eliminating duplicates"
                ],
                "answerIndex": 1
              },
              {
                "question": "In the EMPLOYEE self-join, what does COALESCE(M.Name,'No Manager') do?",
                "options": [
                  "Removes NULL rows",
                  "Replaces NULL Manager name with 'No Manager'",
                  "Creates a new manager named 'No Manager'",
                  "Filters employees with no manager"
                ],
                "answerIndex": 1
              },
              {
                "question": "FULL OUTER JOIN of A (3 rows) and B (4 rows) with 2 matches returns:",
                "options": [
                  "2 rows",
                  "7 rows",
                  "12 rows",
                  "5 rows (3+4-2)"
                ],
                "answerIndex": 3
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.1 on OUTER JOINs)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.2.2 on Outer Joins)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: OUTER JOINs and SELF-JOINs",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — OUTER JOINs and SELF-JOINs",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Advanced JOIN Operations"
              ]
          }
        },
        {
          "id": "db-w6-3",
          "title": "CROSS JOIN and Multi-table JOIN",
          "desc": "(a) CROSS JOIN to generate all student-course combinations, (b) Three-table join: STUDENT JOIN MARKS JOIN COURSE to display student name, course title, and marks, (c) Identify the Cartesian product size and optimize with conditions.",
          "expected": "CROSS JOIN produces n×m rows; three-table join returns meaningful combined result with proper column names",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply CROSS JOIN and chain multiple JOINs in a single query. The student will:",
              "bullets": [
                "Apply CROSS JOIN (Cartesian product) to generate all combinations of two tables",
                "Understand when CROSS JOIN is useful (e.g. generating test data, pairing schedules)",
                "Chain three or more JOIN operations in a single SELECT",
                "Select columns from multiple joined tables using table aliases",
                "Appreciate the performance impact of CROSS JOIN on large tables"
              ]
            },
            "theory": [
              {
                "title": "CROSS JOIN",
                "body": [
                  "CROSS JOIN produces the Cartesian product — every row of T1 paired with every row of T2.",
                  "Syntax: SELECT ... FROM T1 CROSS JOIN T2; or simply FROM T1, T2 (implicit cross join).",
                  "Result size: |T1| × |T2| rows.",
                  "No ON clause — all combinations are produced unconditionally.",
                  "Use cases: Generate all possible time slots for a schedule, create a multiplication table, generate test data."
                ]
              },
              {
                "title": "Multi-table JOIN",
                "body": [
                  "Multiple JOINs chain sequentially: FROM A JOIN B ON ... JOIN C ON ...",
                  "Each JOIN adds columns from the new table and filters via its ON condition.",
                  "Example: STUDENT JOIN MARKS ON Roll_No JOIN COURSE ON Course_ID — produces rows with student info, marks, and course title.",
                  "Column name conflicts: use aliases (S.Name, C.Title) to avoid ambiguity."
                ]
              },
              {
                "title": "Implicit vs Explicit Join",
                "body": [
                  "Implicit: FROM STUDENT S, MARKS M WHERE S.Roll_No = M.Roll_No — old SQL-89 style (CROSS JOIN + WHERE).",
                  "Explicit (preferred): FROM STUDENT S JOIN MARKS M ON S.Roll_No = M.Roll_No — SQL-92 style.",
                  "Explicit syntax is clearer, less error-prone, and required for LEFT/RIGHT/FULL joins."
                ]
              }
            ],
            "pretest": [
              {
                "question": "CROSS JOIN of a 4-row table and a 5-row table produces:",
                "options": [
                  "9 rows",
                  "20 rows",
                  "1 row",
                  "Depends on data"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which of the following is an implicit CROSS JOIN?",
                "options": [
                  "FROM A INNER JOIN B ON A.id=B.id",
                  "FROM A, B WHERE A.id=B.id",
                  "FROM A CROSS JOIN B ON A.id=B.id",
                  "FROM A LEFT JOIN B ON A.id=B.id"
                ],
                "answerIndex": 1
              },
              {
                "question": "Why is explicit JOIN syntax preferred over implicit comma-separated tables?",
                "options": [
                  "It is faster",
                  "It separates join conditions from filter conditions, improving readability",
                  "It is the only valid SQL syntax",
                  "Implicit JOIN is deprecated in all databases"
                ],
                "answerIndex": 1
              },
              {
                "question": "In a three-table join A JOIN B JOIN C, which join is evaluated first?",
                "options": [
                  "C JOIN B",
                  "A JOIN B (left to right)",
                  "Depends on indexes",
                  "The database optimizer decides — order in query is a hint only"
                ],
                "answerIndex": 3
              },
              {
                "question": "CROSS JOIN is particularly dangerous on large tables because:",
                "options": [
                  "It requires a foreign key",
                  "The result size grows multiplicatively, potentially creating billions of rows",
                  "It only works on tables with the same schema",
                  "It ignores indexes"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Ensure STUDENT, MARKS, and COURSE tables are populated",
              "Run: SELECT S.Name, C.Title FROM STUDENT S CROSS JOIN COURSE C — observe all combinations",
              "Count resulting rows: should equal |STUDENT| × |COURSE|",
              "Run the three-table join: STUDENT JOIN MARKS JOIN COURSE",
              "Add ORDER BY and WHERE to filter and sort the result",
              "Compare row counts: CROSS JOIN vs INNER JOIN vs LEFT JOIN",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- COURSE table setup\nCREATE TABLE COURSE(Course_ID VARCHAR(10) PRIMARY KEY, Title VARCHAR(50), Credits INT);\nINSERT INTO COURSE VALUES ('CS101','Database Systems',4),('CS102','OS',3),('CS103','Networks',3);\n\n-- CROSS JOIN: all student-course combinations\nSELECT S.Roll_No, S.Name, C.Course_ID, C.Title\nFROM STUDENT S CROSS JOIN COURSE C\nORDER BY S.Roll_No, C.Course_ID;\n-- 6 students × 3 courses = 18 rows\n\n-- Three-table JOIN\nSELECT S.Name AS Student, C.Title AS Course, M.Marks\nFROM STUDENT S\nJOIN MARKS M ON S.Roll_No = M.Roll_No\nJOIN COURSE C ON M.Course_ID = C.Course_ID\nORDER BY S.Name, C.Title;\n\n-- Compare: implicit join (old style)\nSELECT S.Name, C.Title, M.Marks\nFROM STUDENT S, MARKS M, COURSE C\nWHERE S.Roll_No=M.Roll_No AND M.Course_ID=C.Course_ID;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "CROSS JOIN: 6 students × 3 courses = 18 rows — every possible pair",
                  "memory": [],
                  "output": "18 rows: (Alice,CS101),(Alice,CS102),(Alice,CS103),(Bob,CS101),...,(Eve,CS103)"
                },
                {
                  "line": 2,
                  "annotation": "Three-table JOIN: only rows where both joins match — actual enrollments",
                  "memory": [],
                  "output": "Each student's actual course+marks rows (far fewer than 18)"
                },
                {
                  "line": 3,
                  "annotation": "Implicit join produces identical result to explicit three-table JOIN",
                  "memory": [],
                  "output": "Same rows — just different syntax"
                }
              ]
            },
            "posttest": [
              {
                "question": "How many rows does STUDENT (6 rows) CROSS JOIN COURSE (3 rows) produce?",
                "options": [
                  "9",
                  "18",
                  "3",
                  "6"
                ],
                "answerIndex": 1
              },
              {
                "question": "What is the difference between CROSS JOIN and INNER JOIN result?",
                "options": [
                  "No difference",
                  "CROSS JOIN gives all combinations; INNER JOIN gives only matched combinations",
                  "INNER JOIN is always larger",
                  "CROSS JOIN requires a WHERE clause"
                ],
                "answerIndex": 1
              },
              {
                "question": "In a three-table join, if COURSE has no row matching a MARKS.Course_ID, what happens to that marks row in INNER JOIN?",
                "options": [
                  "NULL appears in Course columns",
                  "The marks row is excluded",
                  "Error is raised",
                  "A default row from COURSE is used"
                ],
                "answerIndex": 1
              },
              {
                "question": "FROM STUDENT S, MARKS M WHERE S.Roll_No=M.Roll_No is equivalent to:",
                "options": [
                  "S LEFT JOIN M ON S.Roll_No=M.Roll_No",
                  "S CROSS JOIN M ON S.Roll_No=M.Roll_No",
                  "S INNER JOIN M ON S.Roll_No=M.Roll_No",
                  "S FULL JOIN M ON S.Roll_No=M.Roll_No"
                ],
                "answerIndex": 2
              },
              {
                "question": "A realistic use of CROSS JOIN is:",
                "options": [
                  "Joining large production tables",
                  "Generating a schedule of all teams vs all other teams",
                  "Replacing INNER JOIN for better performance",
                  "Finding unmatched rows"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.1.1 on CROSS JOIN)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.2 on Multi-table Joins)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: Multi-table Joins and CROSS JOIN",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — Cartesian Product and Multi-table Joins",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Joining Multiple Tables"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 7",
      "objective": "Nested queries, sub-queries, and correlated sub-queries",
      "tutorial": "Tutorial 7: Sub-queries and Nested Queries",
      "labTitle": "Lab 7: Sub-query Techniques",
      "experiments": [
        {
          "id": "db-w7-1",
          "title": "Sub-queries with IN and NOT IN",
          "desc": "(a) Find students enrolled in 'Database Systems' course using sub-query with IN, (b) Find students NOT enrolled in any course using NOT IN, (c) Rewrite using JOIN and compare performance.",
          "expected": "Correct results using IN/NOT IN sub-queries equivalent to join-based queries",
          "content": {
            "aim": {
              "text": "In this experiment, the student will write SQL sub-queries using IN and NOT IN operators to filter data based on results from another query. The student will:",
              "bullets": [
                "Write a scalar sub-query and a multi-row sub-query",
                "Use the IN operator to filter rows based on a set returned by a sub-query",
                "Use the NOT IN operator to find rows absent from a sub-query result",
                "Rewrite IN-based sub-queries as equivalent INNER JOIN queries",
                "Rewrite NOT IN-based sub-queries as equivalent LEFT JOIN + IS NULL queries",
                "Understand the NULL pitfall when using NOT IN"
              ]
            },
            "theory": [
              {
                "title": "What is a Sub-query?",
                "body": [
                  "A sub-query (also called inner query or nested query) is a SELECT statement embedded inside another SQL statement.",
                  "The outer query uses the result of the inner query as a value or set of values.",
                  "Sub-queries can appear in the WHERE clause, FROM clause (derived tables), or SELECT list.",
                  "Types: single-row sub-query (returns one value), multi-row sub-query (returns a set), and correlated sub-query (references outer query columns)."
                ]
              },
              {
                "title": "IN Operator with Sub-query",
                "body": [
                  "Syntax: SELECT ... FROM T1 WHERE col IN (SELECT col FROM T2 WHERE condition);",
                  "The inner query returns a set of values; the outer query retains rows where col matches any value in that set.",
                  "Equivalent JOIN: SELECT T1.* FROM T1 INNER JOIN T2 ON T1.col = T2.col WHERE T2.condition;",
                  "Example: SELECT Name FROM STUDENT WHERE Roll_No IN (SELECT Roll_No FROM MARKS WHERE Course_ID='CS101');"
                ]
              },
              {
                "title": "NOT IN Operator with Sub-query",
                "body": [
                  "Syntax: SELECT ... FROM T1 WHERE col NOT IN (SELECT col FROM T2);",
                  "Returns rows in T1 where col does not appear in the sub-query result set.",
                  "CRITICAL NULL PITFALL: If the sub-query result contains even one NULL value, NOT IN returns NO rows. Always add WHERE col IS NOT NULL inside the sub-query when using NOT IN.",
                  "Equivalent LEFT JOIN: SELECT T1.* FROM T1 LEFT JOIN T2 ON T1.col=T2.col WHERE T2.col IS NULL;"
                ]
              },
              {
                "title": "Sub-query vs JOIN Performance",
                "body": [
                  "In modern database engines (MySQL, PostgreSQL, SQLite), the query optimizer often rewrites IN sub-queries as joins internally.",
                  "For large datasets, explicit JOINs can be more predictable in performance.",
                  "NOT EXISTS is often more efficient than NOT IN because it short-circuits on the first match and is NULL-safe.",
                  "Always check the query execution plan using EXPLAIN to understand optimizer choices."
                ]
              }
            ],
            "pretest": [
              {
                "question": "A sub-query that returns a single value is called a:",
                "options": [
                  "Multi-row sub-query",
                  "Correlated sub-query",
                  "Scalar sub-query",
                  "Nested join"
                ],
                "answerIndex": 2
              },
              {
                "question": "WHERE Roll_No IN (SELECT Roll_No FROM MARKS) returns:",
                "options": [
                  "Students not in MARKS",
                  "Students whose Roll_No appears in MARKS",
                  "All students",
                  "Only the first matching student"
                ],
                "answerIndex": 1
              },
              {
                "question": "What is the NULL pitfall with NOT IN?",
                "options": [
                  "NOT IN ignores NULLs automatically",
                  "If the sub-query returns any NULL, NOT IN returns zero rows",
                  "NULL is treated as 0 in NOT IN",
                  "NOT IN cannot be used with sub-queries"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which of the following is equivalent to T1 WHERE col IN (SELECT col FROM T2)?",
                "options": [
                  "T1 LEFT JOIN T2 ON T1.col=T2.col WHERE T2.col IS NULL",
                  "T1 INNER JOIN T2 ON T1.col=T2.col",
                  "T1 CROSS JOIN T2",
                  "T1 FULL JOIN T2"
                ],
                "answerIndex": 1
              },
              {
                "question": "Sub-queries in the FROM clause are called:",
                "options": [
                  "Correlated sub-queries",
                  "Derived tables",
                  "Scalar sub-queries",
                  "Inline views"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Open the Code Test tab — STUDENT, MARKS, and COURSE tables are pre-populated",
              "Run sub-query with IN: SELECT Name FROM STUDENT WHERE Roll_No IN (SELECT Roll_No FROM MARKS WHERE Course_ID='CS101')",
              "Observe which students are returned",
              "Run NOT IN: SELECT Name FROM STUDENT WHERE Roll_No NOT IN (SELECT Roll_No FROM MARKS)",
              "Insert a NULL Roll_No into MARKS (if possible) and observe the NOT IN pitfall",
              "Rewrite the IN query as an INNER JOIN and verify identical results",
              "Rewrite the NOT IN query as a LEFT JOIN + IS NULL and verify identical results",
              "Use EXPLAIN to compare query plans of sub-query vs JOIN versions",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Setup\nCREATE TABLE COURSE(Course_ID VARCHAR(10) PRIMARY KEY, Title VARCHAR(50), Credits INT);\nINSERT INTO COURSE VALUES ('CS101','Database Systems',4),('CS102','Operating Systems',3),('CS103','Computer Networks',3);\n\n-- (a) Students enrolled in 'Database Systems' using IN\nSELECT S.Roll_No, S.Name\nFROM STUDENT S\nWHERE S.Roll_No IN (\n    SELECT M.Roll_No FROM MARKS M WHERE M.Course_ID = 'CS101'\n);\n\n-- Equivalent JOIN\nSELECT DISTINCT S.Roll_No, S.Name\nFROM STUDENT S\nINNER JOIN MARKS M ON S.Roll_No = M.Roll_No\nWHERE M.Course_ID = 'CS101';\n\n-- (b) Students NOT enrolled in any course using NOT IN\nSELECT S.Roll_No, S.Name\nFROM STUDENT S\nWHERE S.Roll_No NOT IN (\n    SELECT Roll_No FROM MARKS WHERE Roll_No IS NOT NULL\n);\n\n-- Equivalent LEFT JOIN\nSELECT S.Roll_No, S.Name\nFROM STUDENT S\nLEFT JOIN MARKS M ON S.Roll_No = M.Roll_No\nWHERE M.Roll_No IS NULL;\n\n-- NULL pitfall demonstration\n-- INSERT INTO MARKS VALUES (NULL,'CS101',50);\n-- Now NOT IN returns 0 rows without IS NOT NULL guard",
              "steps": [
                {
                  "line": 1,
                  "annotation": "Inner query: SELECT Roll_No FROM MARKS WHERE Course_ID='CS101' — returns {101,102,103,104,105}",
                  "memory": [],
                  "output": "Inner result set: {101, 102, 103, 104, 105}"
                },
                {
                  "line": 2,
                  "annotation": "Outer query: STUDENT rows where Roll_No is in the inner set",
                  "memory": [],
                  "output": "Alice(101), Bob(102), Carol(103), David(104), Amy(105)"
                },
                {
                  "line": 3,
                  "annotation": "Eve(106) has no rows in MARKS — NOT IN returns her",
                  "memory": [],
                  "output": "NOT IN result: Eve(106)"
                },
                {
                  "line": 4,
                  "annotation": "LEFT JOIN + IS NULL produces the same result as NOT IN",
                  "memory": [],
                  "output": "Eve(106) — identical result"
                },
                {
                  "line": 5,
                  "annotation": "NULL pitfall: if MARKS has a NULL Roll_No, NOT IN returns 0 rows",
                  "memory": [],
                  "output": "Demonstration: NOT IN returns empty set when NULL present in sub-query without IS NOT NULL guard"
                }
              ]
            },
            "posttest": [
              {
                "question": "What does SELECT Name FROM STUDENT WHERE Roll_No NOT IN (SELECT Roll_No FROM MARKS) return if MARKS is empty?",
                "options": [
                  "0 rows",
                  "All students",
                  "Only students with NULL Roll_No",
                  "Error"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which query correctly finds students enrolled in BOTH CS101 and CS102?",
                "options": [
                  "WHERE Course_ID IN ('CS101','CS102')",
                  "WHERE Roll_No IN (SELECT Roll_No FROM MARKS WHERE Course_ID='CS101') AND Roll_No IN (SELECT Roll_No FROM MARKS WHERE Course_ID='CS102')",
                  "WHERE Course_ID='CS101' AND Course_ID='CS102'",
                  "WHERE Roll_No NOT IN (SELECT Roll_No FROM MARKS)"
                ],
                "answerIndex": 1
              },
              {
                "question": "A sub-query in the FROM clause must:",
                "options": [
                  "Have a WHERE clause",
                  "Have an alias",
                  "Return exactly one row",
                  "Use IN operator"
                ],
                "answerIndex": 1
              },
              {
                "question": "Why is NOT EXISTS often preferred over NOT IN?",
                "options": [
                  "NOT EXISTS is faster always",
                  "NOT EXISTS is NULL-safe and short-circuits on first match",
                  "NOT IN does not work in SQLite",
                  "NOT EXISTS uses joins internally"
                ],
                "answerIndex": 1
              },
              {
                "question": "SELECT Name FROM STUDENT WHERE Roll_No IN (SELECT Roll_No FROM MARKS WHERE Marks > 80) returns:",
                "options": [
                  "Students with all marks > 80",
                  "Students who have at least one mark record above 80",
                  "Students with average marks > 80",
                  "All students"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.2 on Subqueries)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.3 on Nested Queries)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: Nested Queries with IN and NOT IN",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — Subqueries",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Subqueries with IN and NOT IN"
              ]
          }
        },
        {
          "id": "db-w7-2",
          "title": "Correlated Sub-queries and EXISTS",
          "desc": "(a) Find students who scored above the average marks of their own department (correlated sub-query), (b) Find departments that have at least one student using EXISTS, (c) Find students with no marks using NOT EXISTS.",
          "expected": "Correlated sub-query re-executes for each outer row; correct results verified against equivalent JOIN-based queries",
          "content": {
            "aim": {
              "text": "In this experiment, the student will write correlated sub-queries and use the EXISTS / NOT EXISTS operators. The student will:",
              "bullets": [
                "Write a correlated sub-query that references a column from the outer query",
                "Understand that a correlated sub-query executes once per outer row",
                "Use EXISTS to test whether a sub-query returns at least one row",
                "Use NOT EXISTS to find rows with no matching sub-query result",
                "Compare correlated sub-queries with equivalent JOIN and GROUP BY approaches"
              ]
            },
            "theory": [
              {
                "title": "Correlated Sub-query",
                "body": [
                  "A correlated sub-query references one or more columns from the outer query — it is re-evaluated for each row of the outer query.",
                  "This makes it different from a non-correlated (independent) sub-query, which executes only once.",
                  "Example: Find students who scored above the average marks of their own department — the average must be computed per department, which depends on which student's department is currently being evaluated.",
                  "Syntax: SELECT * FROM T1 outer WHERE col > (SELECT AVG(col) FROM T1 inner WHERE inner.group_col = outer.group_col);"
                ]
              },
              {
                "title": "EXISTS Operator",
                "body": [
                  "EXISTS returns TRUE if the sub-query returns at least one row, regardless of what those rows contain.",
                  "Syntax: SELECT ... FROM T1 WHERE EXISTS (SELECT 1 FROM T2 WHERE T2.key = T1.key);",
                  "It is NULL-safe — unlike IN, it does not have the NULL pitfall.",
                  "EXISTS short-circuits: it stops scanning T2 as soon as one matching row is found, making it efficient.",
                  "SELECT 1 (or SELECT * or SELECT any column) in the inner query is conventional — only existence matters."
                ]
              },
              {
                "title": "NOT EXISTS Operator",
                "body": [
                  "NOT EXISTS returns TRUE when the sub-query returns zero rows.",
                  "Preferred over NOT IN when NULLs may be present in the sub-query result.",
                  "Syntax: SELECT ... FROM T1 WHERE NOT EXISTS (SELECT 1 FROM T2 WHERE T2.key = T1.key);",
                  "Equivalent to LEFT JOIN + WHERE T2.key IS NULL — both return rows with no match."
                ]
              },
              {
                "title": "Performance of Correlated Sub-queries",
                "body": [
                  "Correlated sub-queries can be expensive for large tables because they re-execute for every outer row (O(n×m) in the worst case).",
                  "Many database optimizers can transform them into equivalent joins automatically.",
                  "For the above-average-per-department problem, an equivalent approach is: JOIN with a derived table that pre-computes the department average — usually more efficient."
                ]
              }
            ],
            "pretest": [
              {
                "question": "What distinguishes a correlated sub-query from a non-correlated one?",
                "options": [
                  "It uses EXISTS instead of IN",
                  "It references a column from the outer query",
                  "It returns more than one row",
                  "It appears in the FROM clause"
                ],
                "answerIndex": 1
              },
              {
                "question": "EXISTS returns TRUE when the sub-query:",
                "options": [
                  "Returns exactly one row",
                  "Returns at least one row",
                  "Returns zero rows",
                  "Returns a NULL value"
                ],
                "answerIndex": 1
              },
              {
                "question": "How many times does a correlated sub-query execute (approximately)?",
                "options": [
                  "Once",
                  "Once per table",
                  "Once per outer query row",
                  "Once per inner query row"
                ],
                "answerIndex": 2
              },
              {
                "question": "Which is NULL-safe: IN or EXISTS?",
                "options": [
                  "IN",
                  "EXISTS",
                  "Both",
                  "Neither"
                ],
                "answerIndex": 1
              },
              {
                "question": "SELECT 1 inside an EXISTS sub-query is used because:",
                "options": [
                  "Only the value 1 is valid",
                  "Only existence of rows matters, not their content",
                  "It is faster than SELECT *",
                  "It filters NULL values"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Open the Code Test tab with pre-populated STUDENT and MARKS tables (including Dept_Name column in STUDENT)",
              "Write the correlated sub-query to find students above their department average",
              "Trace the execution: for Alice (CSE), compute CSE average marks; check if Alice's marks exceed it",
              "Run the EXISTS query: find departments with at least one enrolled student",
              "Run the NOT EXISTS query: find students with no marks record",
              "Verify each result against an equivalent JOIN + GROUP BY version",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- (a) Correlated sub-query: students above their dept average\nSELECT S.Roll_No, S.Name, S.Dept_Name, M.Marks\nFROM STUDENT S\nJOIN MARKS M ON S.Roll_No = M.Roll_No\nWHERE M.Marks > (\n    SELECT AVG(M2.Marks)\n    FROM STUDENT S2\n    JOIN MARKS M2 ON S2.Roll_No = M2.Roll_No\n    WHERE S2.Dept_Name = S.Dept_Name  -- references outer S.Dept_Name\n    AND M2.Course_ID = M.Course_ID\n);\n\n-- Equivalent using derived table (more efficient)\nSELECT S.Roll_No, S.Name, S.Dept_Name, M.Marks, DA.Dept_Avg\nFROM STUDENT S\nJOIN MARKS M ON S.Roll_No = M.Roll_No\nJOIN (\n    SELECT S2.Dept_Name, M2.Course_ID, AVG(M2.Marks) AS Dept_Avg\n    FROM STUDENT S2 JOIN MARKS M2 ON S2.Roll_No=M2.Roll_No\n    GROUP BY S2.Dept_Name, M2.Course_ID\n) DA ON DA.Dept_Name = S.Dept_Name AND DA.Course_ID = M.Course_ID\nWHERE M.Marks > DA.Dept_Avg;\n\n-- (b) EXISTS: departments with at least one student\nSELECT D.Dept_Name\nFROM DEPARTMENT D\nWHERE EXISTS (\n    SELECT 1 FROM STUDENT S WHERE S.Dept_Name = D.Dept_Name\n);\n\n-- (c) NOT EXISTS: students with no marks\nSELECT S.Roll_No, S.Name\nFROM STUDENT S\nWHERE NOT EXISTS (\n    SELECT 1 FROM MARKS M WHERE M.Roll_No = S.Roll_No\n);",
              "steps": [
                {
                  "line": 1,
                  "annotation": "Correlated sub-query: for each (student, course) pair, compute department+course average. Re-executes for every outer row.",
                  "memory": [],
                  "output": "CSE CS101 avg = (85+91)/2 = 88. Carol(91) > 88 qualifies; Alice(85) does not."
                },
                {
                  "line": 2,
                  "annotation": "Derived table pre-computes all dept+course averages in one pass — same result, more efficient",
                  "memory": [],
                  "output": "Same qualifying students; Dept_Avg column now visible"
                },
                {
                  "line": 3,
                  "annotation": "EXISTS: for each department, check if any student row matches — CSE, IT, ECE all have students",
                  "memory": [],
                  "output": "CSE, IT, ECE — all departments have at least one student"
                },
                {
                  "line": 4,
                  "annotation": "NOT EXISTS: for Eve(106), no row in MARKS matches — NOT EXISTS is TRUE",
                  "memory": [],
                  "output": "(106, Eve) — student with no marks record"
                }
              ]
            },
            "posttest": [
              {
                "question": "In a correlated sub-query, if the outer table has 100 rows and the inner table has 1000 rows, roughly how many rows does the inner query scan in the worst case?",
                "options": [
                  "100",
                  "1000",
                  "100,000",
                  "10"
                ],
                "answerIndex": 2
              },
              {
                "question": "SELECT * FROM DEPARTMENT D WHERE NOT EXISTS (SELECT 1 FROM STUDENT S WHERE S.Dept_Name=D.Dept_Name) returns:",
                "options": [
                  "Departments with students",
                  "Departments with no students",
                  "All departments",
                  "Departments with exactly one student"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which approach avoids re-executing the average computation for every row?",
                "options": [
                  "Correlated sub-query",
                  "EXISTS clause",
                  "Derived table with GROUP BY",
                  "NOT IN clause"
                ],
                "answerIndex": 2
              },
              {
                "question": "EXISTS (SELECT 1 FROM T WHERE ...) and EXISTS (SELECT * FROM T WHERE ...) produce:",
                "options": [
                  "Different results",
                  "Same results",
                  "EXISTS with SELECT 1 is faster always",
                  "Only SELECT 1 is valid syntax"
                ],
                "answerIndex": 1
              },
              {
                "question": "A correlated sub-query WHERE M.Marks > (SELECT AVG(M2.Marks) FROM MARKS M2 WHERE M2.Course_ID = M.Course_ID) finds:",
                "options": [
                  "Students above overall average",
                  "Students above the average of their own course",
                  "Students above the maximum marks",
                  "Students below course average"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Sections 4.2.4-4.2.5 on Correlated Subqueries and EXISTS)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.3.3 on Correlated Subqueries)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: Correlated Subqueries and EXISTS/NOT EXISTS",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — Correlated Subqueries",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: Advanced Subqueries"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 8",
      "objective": "Views — creation, querying, updatable and non-updatable views",
      "tutorial": "Tutorial 8: SQL Views",
      "labTitle": "Lab 8: Views in SQL",
      "experiments": [
        {
          "id": "db-w8-1",
          "title": "Creating and Querying Views",
          "desc": "(a) Create a view CSE_STUDENTS showing students in the CSE department, (b) Create a view TOPPER_VIEW showing the student with the highest marks per course, (c) Query views like regular tables and observe that data reflects underlying table changes.",
          "expected": "Views created successfully and queryable; data reflects underlying table changes automatically",
          "content": {
            "aim": {
              "text": "In this experiment, the student will create SQL views and query them as virtual tables. The student will:",
              "bullets": [
                "Create simple views using CREATE VIEW ... AS SELECT ...",
                "Create complex views involving joins and aggregate functions",
                "Query a view using SELECT just like a regular table",
                "Understand that views are virtual — they do not store data but re-execute the underlying query",
                "Demonstrate that changes to base tables are automatically reflected in views",
                "Use views to simplify complex queries and enforce data abstraction"
              ]
            },
            "theory": [
              {
                "title": "What is a View?",
                "body": [
                  "A view is a named query stored in the database catalog. It behaves like a virtual table — it has rows and columns like a real table, but stores no data itself.",
                  "Each time a view is queried, the DBMS executes the underlying SELECT statement and returns the result.",
                  "Syntax: CREATE VIEW view_name AS SELECT ... FROM ... WHERE ...;",
                  "Views are dropped with: DROP VIEW view_name;"
                ]
              },
              {
                "title": "Advantages of Views",
                "body": [
                  "Simplicity: Hide complex joins and sub-queries behind a simple name.",
                  "Security: Expose only certain rows/columns to specific users — a user can be granted access to a view but not the base table.",
                  "Logical Data Independence: If the base table schema changes, only the view definition needs updating — applications querying the view are unaffected.",
                  "Reusability: Define a complex query once and reference it multiple times."
                ]
              },
              {
                "title": "How Views Are Evaluated",
                "body": [
                  "Query Modification (most common): The DBMS merges the view's SELECT with the outer query into a single query and executes it.",
                  "Materialized Views (not standard in SQLite): Some databases physically store the view result and refresh it periodically for performance."
                ]
              },
              {
                "title": "Creating Views — Syntax",
                "body": [
                  "CREATE VIEW CSE_STUDENTS AS SELECT * FROM STUDENT WHERE Dept_Name = 'CSE';",
                  "Column aliases in views: CREATE VIEW STUDENT_SUMMARY(Roll, Full_Name, Dept) AS SELECT Roll_No, Name, Dept_Name FROM STUDENT;",
                  "Views with joins: CREATE VIEW STUDENT_MARKS_VIEW AS SELECT S.Name, M.Course_ID, M.Marks FROM STUDENT S JOIN MARKS M ON S.Roll_No=M.Roll_No;"
                ]
              }
            ],
            "pretest": [
              {
                "question": "A view stores data physically in the database.",
                "options": [
                  "True",
                  "False — a view stores only the query definition",
                  "True if materialized",
                  "Depends on DBMS"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which statement creates a view?",
                "options": [
                  "MAKE VIEW v AS SELECT ...",
                  "CREATE VIEW v AS SELECT ...",
                  "INSERT VIEW v SELECT ...",
                  "DEFINE VIEW v SELECT ..."
                ],
                "answerIndex": 1
              },
              {
                "question": "If the base table is updated after a view is created, the view reflects:",
                "options": [
                  "The old data at view creation time",
                  "The updated data automatically",
                  "An error",
                  "Depends on the view type"
                ],
                "answerIndex": 1
              },
              {
                "question": "What command removes a view?",
                "options": [
                  "DELETE VIEW v",
                  "REMOVE VIEW v",
                  "DROP VIEW v",
                  "TRUNCATE VIEW v"
                ],
                "answerIndex": 2
              },
              {
                "question": "Views are primarily used for:",
                "options": [
                  "Storing duplicate data",
                  "Speeding up all queries",
                  "Simplifying complex queries and enforcing security",
                  "Replacing indexes"
                ],
                "answerIndex": 2
              }
            ],
            "procedure": [
              "Open the Code Test tab with the pre-populated STUDENT, MARKS, and COURSE tables",
              "Create the view CSE_STUDENTS: CREATE VIEW CSE_STUDENTS AS SELECT * FROM STUDENT WHERE Dept_Name='CSE'",
              "Query the view: SELECT * FROM CSE_STUDENTS",
              "Insert a new CSE student into STUDENT; re-query CSE_STUDENTS and observe the new row appears",
              "Create TOPPER_VIEW using a sub-query to find the max-marks student per course",
              "Query TOPPER_VIEW: SELECT * FROM TOPPER_VIEW",
              "Use the view in a join: SELECT T.Name, C.Title FROM TOPPER_VIEW T JOIN COURSE C ON T.Course_ID=C.Course_ID",
              "Drop CSE_STUDENTS: DROP VIEW CSE_STUDENTS",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- (a) Simple view: CSE students only\nCREATE VIEW CSE_STUDENTS AS\nSELECT Roll_No, Name, Age, Email\nFROM STUDENT\nWHERE Dept_Name = 'CSE';\n\nSELECT * FROM CSE_STUDENTS;\n\n-- Insert new CSE student and re-query view\nINSERT INTO STUDENT VALUES (107,'Frank',20,'CSE','frank@edu.in');\nSELECT * FROM CSE_STUDENTS; -- Frank now appears\n\n-- (b) Complex view: topper per course\nCREATE VIEW TOPPER_VIEW AS\nSELECT M.Course_ID, S.Name, M.Marks\nFROM MARKS M\nJOIN STUDENT S ON M.Roll_No = S.Roll_No\nWHERE M.Marks = (\n    SELECT MAX(M2.Marks) FROM MARKS M2 WHERE M2.Course_ID = M.Course_ID\n);\n\nSELECT * FROM TOPPER_VIEW;\n\n-- (c) Use view in a join\nSELECT T.Course_ID, T.Name AS Topper, T.Marks, C.Title\nFROM TOPPER_VIEW T\nJOIN COURSE C ON T.Course_ID = C.Course_ID;\n\n-- Drop view\nDROP VIEW CSE_STUDENTS;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "CREATE VIEW CSE_STUDENTS stores the SELECT query definition — no data copied",
                  "memory": [],
                  "output": "View CSE_STUDENTS created"
                },
                {
                  "line": 2,
                  "annotation": "Query view: DBMS executes the stored SELECT against STUDENT table at query time",
                  "memory": [],
                  "output": "Alice(101,CSE), Carol(103,CSE)"
                },
                {
                  "line": 3,
                  "annotation": "Frank inserted into base table — view automatically reflects the change",
                  "memory": [],
                  "output": "CSE_STUDENTS: Alice(101), Carol(103), Frank(107)"
                },
                {
                  "line": 4,
                  "annotation": "TOPPER_VIEW uses correlated sub-query to find max marks per course",
                  "memory": [],
                  "output": "CS101→Carol(91), CS102→Carol(88), CS103→Alice(90)"
                },
                {
                  "line": 5,
                  "annotation": "View used in join with COURSE table — no different from joining with a real table",
                  "memory": [],
                  "output": "CS101 Database Systems → Carol 91; CS102 OS → Carol 88"
                }
              ]
            },
            "posttest": [
              {
                "question": "After DROP VIEW CSE_STUDENTS, what happens to the STUDENT table?",
                "options": [
                  "It is also deleted",
                  "CSE rows are removed",
                  "It is unchanged — only the view definition is removed",
                  "An error occurs"
                ],
                "answerIndex": 2
              },
              {
                "question": "Which view advantage ensures that users cannot see salary data even if querying the view?",
                "options": [
                  "Simplicity",
                  "Security — views expose only selected columns",
                  "Performance",
                  "Normalization"
                ],
                "answerIndex": 1
              },
              {
                "question": "If STUDENT table is renamed to LEARNER after CSE_STUDENTS view is created, querying CSE_STUDENTS will:",
                "options": [
                  "Return CSE students from LEARNER automatically",
                  "Raise an error because the base table is missing",
                  "Return empty result",
                  "Rename the table back"
                ],
                "answerIndex": 1
              },
              {
                "question": "Can a view reference another view?",
                "options": [
                  "Never",
                  "Yes — views can be nested",
                  "Only in Oracle",
                  "Only if both views have no joins"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which statement about a view with a correlated sub-query is true?",
                "options": [
                  "It runs faster than a simple view",
                  "The sub-query re-executes each time the view is queried",
                  "The sub-query result is cached permanently",
                  "Correlated sub-queries cannot appear in views"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.3 on Views)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.8 on Views)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: Views in SQL",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — Views",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 9: Creating and Managing Views"
              ]
          }
        },
        {
          "id": "db-w8-2",
          "title": "Updatable vs Non-updatable Views",
          "desc": "(a) Demonstrate that a simple single-table view allows INSERT and UPDATE, (b) Demonstrate that a view with GROUP BY, DISTINCT, or JOIN does not allow DML, (c) Use WITH CHECK OPTION to restrict INSERTs through a view.",
          "expected": "Correct behavior: simple view allows DML; complex view raises error on DML attempt; WITH CHECK OPTION rejects out-of-scope inserts",
          "content": {
            "aim": {
              "text": "In this experiment, the student will distinguish between updatable and non-updatable views and apply WITH CHECK OPTION. The student will:",
              "bullets": [
                "Insert and update rows through a simple single-table view",
                "Understand that DML through a view modifies the underlying base table",
                "Identify conditions that make a view non-updatable (GROUP BY, DISTINCT, joins, sub-queries in SELECT, computed columns)",
                "Apply WITH CHECK OPTION to enforce that new rows remain visible in the view after insertion",
                "Verify that WITH CHECK OPTION rejects rows that would not satisfy the view's WHERE condition"
              ]
            },
            "theory": [
              {
                "title": "Updatable Views",
                "body": [
                  "A view is updatable if INSERT, UPDATE, and DELETE can be performed through it to modify the underlying base table.",
                  "SQL standard conditions for updatability: (1) Based on a single base table, (2) No DISTINCT in SELECT, (3) No aggregate functions, (4) No GROUP BY or HAVING, (5) No sub-queries in the SELECT list, (6) No computed columns (arithmetic expressions) in the SELECT list without aliases that map to base columns.",
                  "Example updatable view: CREATE VIEW IT_STUDENTS AS SELECT * FROM STUDENT WHERE Dept_Name='IT';"
                ]
              },
              {
                "title": "Non-updatable Views",
                "body": [
                  "Views involving JOINs, GROUP BY, HAVING, DISTINCT, aggregate functions, or sub-queries in the SELECT list are generally non-updatable.",
                  "Attempting DML on a non-updatable view raises an error: 'cannot modify a view that is not updatable'.",
                  "Reason: The DBMS cannot unambiguously determine which base table row(s) to modify when the view hides complex transformations."
                ]
              },
              {
                "title": "WITH CHECK OPTION",
                "body": [
                  "WITH CHECK OPTION ensures that any row inserted or updated through a view must satisfy the view's WHERE condition.",
                  "Without CHECK OPTION: you can insert a row that disappears from the view immediately after insertion (because it does not satisfy the view's filter).",
                  "Syntax: CREATE VIEW IT_STUDENTS AS SELECT * FROM STUDENT WHERE Dept_Name='IT' WITH CHECK OPTION;",
                  "Attempting to insert a student with Dept_Name='CSE' through IT_STUDENTS view with CHECK OPTION raises a constraint violation."
                ]
              }
            ],
            "pretest": [
              {
                "question": "Which type of view allows INSERT and UPDATE operations?",
                "options": [
                  "View with GROUP BY",
                  "View with DISTINCT",
                  "Single-table view without aggregation",
                  "View with INNER JOIN"
                ],
                "answerIndex": 2
              },
              {
                "question": "WITH CHECK OPTION on a view ensures:",
                "options": [
                  "The view cannot be updated",
                  "Inserted/updated rows must satisfy the view's WHERE condition",
                  "Only SELECT is allowed on the view",
                  "The view is materialized"
                ],
                "answerIndex": 1
              },
              {
                "question": "A view defined as SELECT Dept_Name, COUNT(*) FROM STUDENT GROUP BY Dept_Name is:",
                "options": [
                  "Updatable",
                  "Non-updatable",
                  "Updatable only for DELETE",
                  "Updatable only for SELECT"
                ],
                "answerIndex": 1
              },
              {
                "question": "Inserting a row through a view modifies:",
                "options": [
                  "Only the view",
                  "The view's internal cache",
                  "The underlying base table",
                  "A temporary copy of the base table"
                ],
                "answerIndex": 2
              },
              {
                "question": "What happens if you INSERT a row through a view without WITH CHECK OPTION that does not match the view's WHERE?",
                "options": [
                  "The insert is rejected",
                  "The row is inserted into the base table but not visible in the view",
                  "The view is recreated",
                  "An error is always raised"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Create updatable view IT_STUDENTS: CREATE VIEW IT_STUDENTS AS SELECT * FROM STUDENT WHERE Dept_Name='IT'",
              "Insert a student through the view: INSERT INTO IT_STUDENTS VALUES (108,'Hema',21,'IT','hema@edu.in')",
              "Verify the row appears in both IT_STUDENTS view and STUDENT base table",
              "Update through the view: UPDATE IT_STUDENTS SET Age=22 WHERE Roll_No=108",
              "Attempt DML on TOPPER_VIEW (non-updatable) — observe the error",
              "Re-create IT_STUDENTS with WITH CHECK OPTION",
              "Attempt to insert a CSE student through IT_STUDENTS and observe the rejection",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- (a) Updatable view — single table, no aggregation\nCREATE VIEW IT_STUDENTS AS\nSELECT Roll_No, Name, Age, Email, Dept_Name\nFROM STUDENT\nWHERE Dept_Name = 'IT';\n\n-- INSERT through view\nINSERT INTO IT_STUDENTS VALUES (108,'Hema',21,'hema@edu.in','IT');\n\n-- Verify in base table\nSELECT * FROM STUDENT WHERE Roll_No = 108;\n\n-- UPDATE through view\nUPDATE IT_STUDENTS SET Age = 22 WHERE Roll_No = 108;\n\n-- DELETE through view\nDELETE FROM IT_STUDENTS WHERE Roll_No = 108;\n\n-- (b) Non-updatable view — GROUP BY\nCREATE VIEW DEPT_COUNT AS\nSELECT Dept_Name, COUNT(*) AS Cnt FROM STUDENT GROUP BY Dept_Name;\n\n-- Attempt DML on non-updatable view — will error\n-- INSERT INTO DEPT_COUNT VALUES ('Physics',1); -- ERROR\n\n-- (c) WITH CHECK OPTION\nDROP VIEW IT_STUDENTS;\nCREATE VIEW IT_STUDENTS AS\nSELECT Roll_No, Name, Age, Email, Dept_Name\nFROM STUDENT\nWHERE Dept_Name = 'IT'\nWITH CHECK OPTION;\n\n-- Valid insert (IT student)\nINSERT INTO IT_STUDENTS VALUES (109,'Ravi',20,'ravi@edu.in','IT');\n\n-- Invalid insert (CSE student) — WITH CHECK OPTION rejects it\nINSERT INTO IT_STUDENTS VALUES (110,'Priya',22,'priya@edu.in','CSE'); -- ERROR",
              "steps": [
                {
                  "line": 1,
                  "annotation": "IT_STUDENTS is a simple single-table view — updatable",
                  "memory": [],
                  "output": "View IT_STUDENTS created"
                },
                {
                  "line": 2,
                  "annotation": "INSERT through view: DBMS rewrites as INSERT INTO STUDENT",
                  "memory": [],
                  "output": "1 row inserted. Hema(108,IT) visible in IT_STUDENTS and STUDENT"
                },
                {
                  "line": 3,
                  "annotation": "UPDATE through view: only IT_STUDENTS rows are in scope",
                  "memory": [],
                  "output": "Hema's Age updated to 22 in STUDENT base table"
                },
                {
                  "line": 4,
                  "annotation": "DEPT_COUNT has GROUP BY — non-updatable; DML raises error",
                  "memory": [],
                  "output": "ERROR: cannot modify a view that is not updatable"
                },
                {
                  "line": 5,
                  "annotation": "WITH CHECK OPTION: Ravi (IT) accepted; Priya (CSE) rejected — does not satisfy WHERE Dept_Name='IT'",
                  "memory": [],
                  "output": "Ravi inserted OK. Priya: ERROR — CHECK OPTION violation"
                }
              ]
            },
            "posttest": [
              {
                "question": "A view with DISTINCT in the SELECT clause is:",
                "options": [
                  "Always updatable",
                  "Non-updatable",
                  "Updatable only for DELETE",
                  "Updatable with WITH CHECK OPTION"
                ],
                "answerIndex": 1
              },
              {
                "question": "After INSERT INTO IT_STUDENTS VALUES (111,'Kiran',21,'kiran@edu.in','IT'), which table actually gains a new row?",
                "options": [
                  "Only IT_STUDENTS",
                  "Both IT_STUDENTS and STUDENT",
                  "Only STUDENT",
                  "A temporary buffer"
                ],
                "answerIndex": 2
              },
              {
                "question": "WITH CHECK OPTION prevents:",
                "options": [
                  "Any DML on the view",
                  "Updates to the base table directly",
                  "Insertions of rows that would not be visible in the view",
                  "Queries on the view"
                ],
                "answerIndex": 2
              },
              {
                "question": "Which of the following views IS updatable?",
                "options": [
                  "CREATE VIEW V AS SELECT Dept_Name, AVG(Age) FROM STUDENT GROUP BY Dept_Name",
                  "CREATE VIEW V AS SELECT DISTINCT Dept_Name FROM STUDENT",
                  "CREATE VIEW V AS SELECT Roll_No, Name FROM STUDENT WHERE Age > 20",
                  "CREATE VIEW V AS SELECT S.Name, M.Marks FROM STUDENT S JOIN MARKS M ON S.Roll_No=M.Roll_No"
                ],
                "answerIndex": 2
              },
              {
                "question": "Why are JOIN-based views generally non-updatable?",
                "options": [
                  "Joins are too slow for DML",
                  "The DBMS cannot determine which base table row to update when a view hides a join",
                  "SQL standard forbids joins in views",
                  "Join views have no primary key"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.3.2 on Updatable Views)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.8.2 on View Update)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 5: Updatable Views and WITH CHECK OPTION",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — View Updatability",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 9: Updatable Views"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 9",
      "objective": "Relational set operations — UNION, INTERSECT, EXCEPT",
      "tutorial": "Tutorial 9: Set Operations in SQL",
      "labTitle": "Lab 9: SQL Set Operations",
      "experiments": [
        {
          "id": "db-w9-1",
          "title": "UNION and UNION ALL",
          "desc": "(a) Combine lists of students from two departments using UNION (eliminates duplicates), (b) Use UNION ALL to include duplicates, (c) List all people (students and instructors) from the university using UNION.",
          "expected": "UNION removes duplicate rows; UNION ALL retains all rows including duplicates; both require union-compatible queries",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply UNION and UNION ALL set operations in SQL. The student will:",
              "bullets": [
                "Understand the requirement for union-compatibility (same number of columns, compatible data types)",
                "Use UNION to combine two result sets and eliminate duplicate rows",
                "Use UNION ALL to combine result sets and retain all rows including duplicates",
                "Apply ORDER BY to the final result of a UNION query",
                "Use UNION to merge data from structurally similar tables (e.g., students and instructors)"
              ]
            },
            "theory": [
              {
                "title": "Union-Compatibility",
                "body": [
                  "For UNION, INTERSECT, and EXCEPT, both SELECT statements must be union-compatible: same number of columns in the same order, with compatible data types.",
                  "Column names in the result are taken from the first SELECT statement.",
                  "Example: SELECT Roll_No, Name FROM STUDENT UNION SELECT Emp_ID, Name FROM INSTRUCTOR — both return two columns of compatible types."
                ]
              },
              {
                "title": "UNION",
                "body": [
                  "UNION combines results of two queries and removes duplicate rows (like a mathematical set union).",
                  "Syntax: SELECT ... UNION SELECT ...;",
                  "Duplicate elimination makes UNION slightly slower than UNION ALL due to the implicit DISTINCT operation.",
                  "Use case: Combine a list of CSE students and IT students — if any student appears in both lists, they appear only once."
                ]
              },
              {
                "title": "UNION ALL",
                "body": [
                  "UNION ALL combines results of two queries and retains ALL rows, including duplicates.",
                  "Syntax: SELECT ... UNION ALL SELECT ...;",
                  "Faster than UNION because no duplicate elimination is performed.",
                  "Use case: Append audit log records where duplicates are valid and must be preserved."
                ]
              },
              {
                "title": "ORDER BY with UNION",
                "body": [
                  "ORDER BY must appear at the end of the entire UNION query, not after individual SELECT statements.",
                  "It sorts the combined final result.",
                  "Example: SELECT Name FROM STUDENT UNION SELECT Name FROM INSTRUCTOR ORDER BY Name ASC;"
                ]
              }
            ],
            "pretest": [
              {
                "question": "For UNION to work, the two SELECT statements must be:",
                "options": [
                  "Identical queries",
                  "Union-compatible (same number of columns, compatible types)",
                  "From the same table",
                  "Have the same WHERE clause"
                ],
                "answerIndex": 1
              },
              {
                "question": "What is the difference between UNION and UNION ALL?",
                "options": [
                  "UNION is faster",
                  "UNION eliminates duplicates; UNION ALL keeps all rows",
                  "UNION ALL removes duplicates",
                  "No difference"
                ],
                "answerIndex": 1
              },
              {
                "question": "Column names in a UNION result are taken from:",
                "options": [
                  "The second SELECT",
                  "The first SELECT",
                  "An automatic combination",
                  "Must be specified explicitly"
                ],
                "answerIndex": 1
              },
              {
                "question": "Where does ORDER BY appear in a UNION query?",
                "options": [
                  "After each SELECT",
                  "After the first SELECT only",
                  "At the very end of the entire UNION query",
                  "Inside the WHERE clause"
                ],
                "answerIndex": 2
              },
              {
                "question": "UNION ALL is preferred over UNION when:",
                "options": [
                  "Duplicates must be removed",
                  "Duplicates are valid and performance matters",
                  "Tables are from different databases",
                  "Only one SELECT is used"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Open the Code Test tab with STUDENT, INSTRUCTOR tables pre-populated",
              "Run UNION: SELECT Roll_No AS ID, Name FROM STUDENT WHERE Dept_Name='CSE' UNION SELECT Roll_No AS ID, Name FROM STUDENT WHERE Dept_Name='IT'",
              "Observe that duplicates are removed (if any student appears in both results)",
              "Run UNION ALL on the same queries and compare row counts",
              "Run the combined STUDENT + INSTRUCTOR list using UNION",
              "Add ORDER BY Name at the end and observe sorted output",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Create INSTRUCTOR table for demonstration\nCREATE TABLE INSTRUCTOR(\n    Emp_ID INT PRIMARY KEY,\n    Name VARCHAR(50) NOT NULL,\n    Dept_Name VARCHAR(20),\n    Qualification VARCHAR(50)\n);\nINSERT INTO INSTRUCTOR VALUES\n  (201,'Dr. Sharma','CSE','PhD'),\n  (202,'Dr. Rao','IT','PhD'),\n  (203,'Prof. Alice','CSE','M.Tech');\n-- Note: Prof. Alice shares name with student Alice\n\n-- (a) UNION: CSE and IT students (duplicates removed)\nSELECT Roll_No AS ID, Name, 'Student' AS Role\nFROM STUDENT WHERE Dept_Name IN ('CSE','IT')\nUNION\nSELECT Roll_No AS ID, Name, 'Student' AS Role\nFROM STUDENT WHERE Dept_Name = 'CSE';\n-- Duplicate CSE rows eliminated\n\n-- (b) UNION ALL: same query with ALL\nSELECT Roll_No AS ID, Name, 'Student' AS Role\nFROM STUDENT WHERE Dept_Name IN ('CSE','IT')\nUNION ALL\nSELECT Roll_No AS ID, Name, 'Student' AS Role\nFROM STUDENT WHERE Dept_Name = 'CSE';\n-- CSE students appear twice\n\n-- (c) All university people: students + instructors\nSELECT Roll_No AS ID, Name, 'Student' AS Role, Dept_Name\nFROM STUDENT\nUNION\nSELECT Emp_ID AS ID, Name, 'Instructor' AS Role, Dept_Name\nFROM INSTRUCTOR\nORDER BY Name ASC;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "UNION eliminates duplicate rows — CSE students appear only once even though they are in both SELECT statements",
                  "memory": [],
                  "output": "CSE+IT students combined, duplicates removed: Alice, Amy, Bob, Carol"
                },
                {
                  "line": 2,
                  "annotation": "UNION ALL: CSE students appear twice (once from IN query, once from CSE-only query)",
                  "memory": [],
                  "output": "More rows than UNION: Alice appears twice, Carol appears twice"
                },
                {
                  "line": 3,
                  "annotation": "Combined student+instructor list; ORDER BY sorts the entire result alphabetically",
                  "memory": [],
                  "output": "Sorted: Alice(Student), Amy(Student), Bob(Student), Carol(Student), David(Student), Dr.Rao(Instructor), Dr.Sharma(Instructor), Eve(Student), Prof.Alice(Instructor)"
                }
              ]
            },
            "posttest": [
              {
                "question": "SELECT A FROM T1 UNION SELECT B, C FROM T2 — what happens?",
                "options": [
                  "Runs successfully with 2 columns",
                  "Fails — the queries are not union-compatible",
                  "Returns only column A",
                  "Returns only columns B and C"
                ],
                "answerIndex": 1
              },
              {
                "question": "If Q1 returns 5 rows and Q2 returns 3 rows with 2 identical to Q1, Q1 UNION Q2 returns:",
                "options": [
                  "8 rows",
                  "6 rows",
                  "5 rows",
                  "3 rows"
                ],
                "answerIndex": 1
              },
              {
                "question": "If Q1 returns 5 rows and Q2 returns 3 rows with 2 identical to Q1, Q1 UNION ALL Q2 returns:",
                "options": [
                  "6 rows",
                  "8 rows",
                  "5 rows",
                  "3 rows"
                ],
                "answerIndex": 1
              },
              {
                "question": "Can ORDER BY be applied to individual SELECT statements inside a UNION?",
                "options": [
                  "Yes, to each SELECT",
                  "No, ORDER BY applies only to the final combined result",
                  "Yes, but only to the first SELECT",
                  "Yes, only with UNION ALL"
                ],
                "answerIndex": 1
              },
              {
                "question": "What is a practical use case for UNION ALL over UNION?",
                "options": [
                  "Finding unique customers",
                  "Appending new transaction records where duplicates must be preserved",
                  "Eliminating duplicate product entries",
                  "Finding common records between two tables"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.2.1 on UNION and UNION ALL)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.2.4 on Set Operations)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: Set Operations in SQL (UNION, UNION ALL)",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — Set Operations",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: UNION and UNION ALL"
              ]
          }
        },
        {
          "id": "db-w9-2",
          "title": "INTERSECT and EXCEPT",
          "desc": "(a) Find students enrolled in both DBMS and OS courses using INTERSECT, (b) Find students in CSE but not in IT using EXCEPT, (c) Simulate INTERSECT using INNER JOIN and EXCEPT using LEFT JOIN + IS NULL.",
          "expected": "Correct set operation results; simulation using joins produces identical results; all queries are union-compatible",
          "content": {
            "aim": {
              "text": "In this experiment, the student will apply INTERSECT and EXCEPT (set difference) SQL operations and understand their join equivalents. The student will:",
              "bullets": [
                "Use INTERSECT to find common rows between two result sets",
                "Use EXCEPT (or MINUS in Oracle) to find rows in the first result set not in the second",
                "Simulate INTERSECT using INNER JOIN and verify identical results",
                "Simulate EXCEPT using LEFT JOIN + WHERE IS NULL and verify identical results",
                "Understand union-compatibility requirements for all set operations"
              ]
            },
            "theory": [
              {
                "title": "INTERSECT",
                "body": [
                  "INTERSECT returns rows that appear in BOTH result sets (mathematical set intersection).",
                  "Duplicates in the output are automatically eliminated.",
                  "Syntax: SELECT col FROM T1 WHERE ... INTERSECT SELECT col FROM T2 WHERE ...;",
                  "Equivalent JOIN: SELECT A.col FROM T1 A INNER JOIN T2 B ON A.col = B.col;",
                  "Example: Find Roll_No of students enrolled in both CS101 AND CS102: SELECT Roll_No FROM MARKS WHERE Course_ID='CS101' INTERSECT SELECT Roll_No FROM MARKS WHERE Course_ID='CS102';"
                ]
              },
              {
                "title": "EXCEPT (SQL Standard) / MINUS (Oracle)",
                "body": [
                  "EXCEPT returns rows in the first result set that do NOT appear in the second (set difference).",
                  "SQLite supports EXCEPT; Oracle uses MINUS.",
                  "Syntax: SELECT col FROM T1 EXCEPT SELECT col FROM T2;",
                  "Equivalent LEFT JOIN: SELECT A.col FROM T1 A LEFT JOIN T2 B ON A.col=B.col WHERE B.col IS NULL;",
                  "Example: Students in CSE who are NOT in IT — since students can only be in one dept, a more meaningful example is: Roll_No in CS101 but NOT in CS102."
                ]
              },
              {
                "title": "Differences from UNION",
                "body": [
                  "UNION combines all rows from both sides; INTERSECT keeps only common rows; EXCEPT keeps rows only from the left side.",
                  "All three (UNION, INTERSECT, EXCEPT) require union-compatible operands.",
                  "INTERSECT and EXCEPT both eliminate duplicates like UNION (there is no INTERSECT ALL or EXCEPT ALL in SQLite, though some databases support it)."
                ]
              }
            ],
            "pretest": [
              {
                "question": "INTERSECT returns rows that appear in:",
                "options": [
                  "Only the first result set",
                  "Only the second result set",
                  "Both result sets",
                  "Neither result set"
                ],
                "answerIndex": 2
              },
              {
                "question": "EXCEPT returns rows that appear in:",
                "options": [
                  "Both result sets",
                  "The first result set but NOT the second",
                  "The second result set but NOT the first",
                  "Neither result set"
                ],
                "answerIndex": 1
              },
              {
                "question": "Oracle's equivalent of EXCEPT is:",
                "options": [
                  "SUBTRACT",
                  "DIFFERENCE",
                  "MINUS",
                  "REMOVE"
                ],
                "answerIndex": 2
              },
              {
                "question": "Which JOIN simulates INTERSECT?",
                "options": [
                  "LEFT JOIN WHERE right IS NULL",
                  "INNER JOIN on common column",
                  "CROSS JOIN",
                  "FULL JOIN WHERE both IS NULL"
                ],
                "answerIndex": 1
              },
              {
                "question": "A INTERSECT B INTERSECT C returns rows present in:",
                "options": [
                  "A or B or C",
                  "A and B only",
                  "A and B and C",
                  "A only"
                ],
                "answerIndex": 2
              }
            ],
            "procedure": [
              "Open the Code Test tab — MARKS table has multiple courses per student",
              "Run INTERSECT: find students enrolled in both CS101 and CS102",
              "Run the equivalent INNER JOIN and verify same Roll_No values",
              "Run EXCEPT: find students in CS101 but NOT in CS102",
              "Run the equivalent LEFT JOIN + IS NULL and verify same results",
              "Combine with STUDENT table to display names instead of Roll_No",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- MARKS sample (multiple courses)\n-- Roll_No 101,102,103 in CS101; 101,103 in CS102; 101,103 in CS103\n\n-- (a) INTERSECT: students enrolled in BOTH CS101 AND CS102\nSELECT Roll_No FROM MARKS WHERE Course_ID = 'CS101'\nINTERSECT\nSELECT Roll_No FROM MARKS WHERE Course_ID = 'CS102';\n\n-- Equivalent INNER JOIN\nSELECT DISTINCT M1.Roll_No\nFROM MARKS M1\nINNER JOIN MARKS M2 ON M1.Roll_No = M2.Roll_No\nWHERE M1.Course_ID = 'CS101' AND M2.Course_ID = 'CS102';\n\n-- (b) EXCEPT: students in CS101 but NOT in CS102\nSELECT Roll_No FROM MARKS WHERE Course_ID = 'CS101'\nEXCEPT\nSELECT Roll_No FROM MARKS WHERE Course_ID = 'CS102';\n\n-- Equivalent LEFT JOIN + IS NULL\nSELECT DISTINCT M1.Roll_No\nFROM MARKS M1\nLEFT JOIN MARKS M2 ON M1.Roll_No = M2.Roll_No AND M2.Course_ID = 'CS102'\nWHERE M1.Course_ID = 'CS101' AND M2.Roll_No IS NULL;\n\n-- Display names\nSELECT S.Name\nFROM STUDENT S\nWHERE S.Roll_No IN (\n    SELECT Roll_No FROM MARKS WHERE Course_ID='CS101'\n    EXCEPT\n    SELECT Roll_No FROM MARKS WHERE Course_ID='CS102'\n);",
              "steps": [
                {
                  "line": 1,
                  "annotation": "CS101 students: {101,102,103,104,105}; CS102 students: {101,102,103}; INTERSECT = {101,102,103}",
                  "memory": [],
                  "output": "INTERSECT result: 101, 102, 103"
                },
                {
                  "line": 2,
                  "annotation": "INNER JOIN self-join on MARKS produces same Roll_No set",
                  "memory": [],
                  "output": "Same: 101, 102, 103"
                },
                {
                  "line": 3,
                  "annotation": "CS101 set {101,102,103,104,105} minus CS102 set {101,102,103} = {104,105}",
                  "memory": [],
                  "output": "EXCEPT result: 104, 105"
                },
                {
                  "line": 4,
                  "annotation": "LEFT JOIN + IS NULL: rows in CS101 that have no matching CS102 record",
                  "memory": [],
                  "output": "Same: 104, 105"
                },
                {
                  "line": 5,
                  "annotation": "Joined with STUDENT: Roll_No 104→David, 105→Amy",
                  "memory": [],
                  "output": "David, Amy"
                }
              ]
            },
            "posttest": [
              {
                "question": "If set A = {1,2,3,4} and B = {3,4,5,6}, A INTERSECT B = ?",
                "options": [
                  "{1,2,5,6}",
                  "{3,4}",
                  "{1,2,3,4,5,6}",
                  "{1,2}"
                ],
                "answerIndex": 1
              },
              {
                "question": "If set A = {1,2,3,4} and B = {3,4,5,6}, A EXCEPT B = ?",
                "options": [
                  "{3,4}",
                  "{1,2,3,4,5,6}",
                  "{1,2}",
                  "{5,6}"
                ],
                "answerIndex": 2
              },
              {
                "question": "Which query finds students enrolled in CS101 but not CS103?",
                "options": [
                  "SELECT Roll_No FROM MARKS WHERE Course_ID='CS101' UNION SELECT Roll_No FROM MARKS WHERE Course_ID='CS103'",
                  "SELECT Roll_No FROM MARKS WHERE Course_ID='CS101' EXCEPT SELECT Roll_No FROM MARKS WHERE Course_ID='CS103'",
                  "SELECT Roll_No FROM MARKS WHERE Course_ID='CS101' INTERSECT SELECT Roll_No FROM MARKS WHERE Course_ID='CS103'",
                  "SELECT Roll_No FROM MARKS WHERE Course_ID IN ('CS101','CS103')"
                ],
                "answerIndex": 1
              },
              {
                "question": "Does INTERSECT eliminate duplicate rows in the result?",
                "options": [
                  "No, duplicates are kept",
                  "Yes, like UNION, duplicates are removed",
                  "Only if DISTINCT is specified",
                  "Depends on the database"
                ],
                "answerIndex": 1
              },
              {
                "question": "The EXCEPT simulation using LEFT JOIN + IS NULL — what does the IS NULL condition represent?",
                "options": [
                  "Rows where the left table column is NULL",
                  "Rows from the left table with no matching row on the right side",
                  "Rows from the right table only",
                  "All NULL values in both tables"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 4: Intermediate SQL (Section 4.2.2-4.2.3 on INTERSECT and EXCEPT)",
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 5: SQL: Queries (Section 5.2.4 on Set Operations)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 8: INTERSECT and EXCEPT/MINUS",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 11: SQL — INTERSECT and EXCEPT",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 8: INTERSECT and EXCEPT"
              ]
          }
        }
      ]
    },
    {
      "title": "WEEK 10",
      "objective": "Functional Dependencies and Normal Forms — 1NF, 2NF, 3NF",
      "tutorial": "Tutorial 10: Normalization — Part 1",
      "labTitle": "Lab 10: Identifying and Resolving Anomalies",
      "experiments": [
        {
          "id": "db-w10-1",
          "title": "Identifying Update, Insert, Delete Anomalies and Functional Dependencies",
          "desc": "Given an unnormalized relation STUDENT_COURSE(Roll_No, Name, Dept, HOD, Course_ID, Course_Name, Credits, Instructor, Marks): (a) Identify update anomaly, (b) Identify insert anomaly, (c) Identify delete anomaly, (d) Identify all functional dependencies.",
          "expected": "All three anomalies correctly identified with examples; complete set of functional dependencies listed with correct notation",
          "content": {
            "aim": {
              "text": "In this experiment, the student will analyze an unnormalized relation for data anomalies and derive its functional dependencies. The student will:",
              "bullets": [
                "Identify update anomalies caused by data redundancy",
                "Identify insertion anomalies where valid data cannot be stored without unrelated data",
                "Identify deletion anomalies where deleting a row causes unintended loss of other data",
                "Derive all functional dependencies (FDs) from the relation's semantics",
                "Identify the primary key and candidate keys using the FD set",
                "Understand why anomalies arise from violations of normalization principles"
              ]
            },
            "theory": [
              {
                "title": "Data Redundancy and Anomalies",
                "body": [
                  "When a relational schema mixes information about multiple entities, it leads to data redundancy — the same fact stored in multiple rows.",
                  "Redundancy causes three types of modification anomalies that compromise data integrity.",
                  "Update Anomaly: The same fact appears in multiple rows; updating it in one row but not others creates inconsistency.",
                  "Insertion Anomaly: Cannot insert a valid entity without providing unrelated information. Example: Cannot add a new course without enrolling a student.",
                  "Deletion Anomaly: Deleting a row to remove one entity inadvertently removes information about another entity."
                ]
              },
              {
                "title": "Functional Dependency (FD)",
                "body": [
                  "A functional dependency X → Y means: for any two tuples with the same value of X, they must have the same value of Y.",
                  "X is called the determinant; Y is the dependent attribute.",
                  "Example: Roll_No → Name means every student roll number uniquely determines the student name.",
                  "FDs are derived from the real-world semantics of the data, not from a specific instance."
                ]
              },
              {
                "title": "Types of FDs",
                "body": [
                  "Full FD: Y is fully functionally dependent on X if X → Y and no proper subset of X determines Y.",
                  "Partial FD: Y is partially dependent on X if some proper subset of X determines Y. Arises with composite keys.",
                  "Transitive FD: X → Y and Y → Z implies X → Z (transitively). Example: Roll_No → Dept → HOD.",
                  "Trivial FD: X → Y where Y ⊆ X. Example: {Roll_No, Name} → Roll_No. Always holds."
                ]
              },
              {
                "title": "Armstrong's Axioms",
                "body": [
                  "Reflexivity: If Y ⊆ X, then X → Y.",
                  "Augmentation: If X → Y, then XZ → YZ.",
                  "Transitivity: If X → Y and Y → Z, then X → Z.",
                  "These axioms are sound and complete — they can derive all FDs implied by a given set."
                ]
              }
            ],
            "pretest": [
              {
                "question": "An update anomaly occurs when:",
                "options": [
                  "A row cannot be inserted",
                  "Updating one row creates inconsistency with other rows storing the same fact",
                  "Deleting one row removes unrelated data",
                  "A query returns wrong results"
                ],
                "answerIndex": 1
              },
              {
                "question": "Roll_No → Name is an example of:",
                "options": [
                  "Trivial FD",
                  "Partial FD",
                  "Functional Dependency",
                  "Multivalued Dependency"
                ],
                "answerIndex": 2
              },
              {
                "question": "If {Roll_No, Course_ID} is the primary key and Roll_No → Name, then Name has a:",
                "options": [
                  "Full functional dependency on the key",
                  "Partial functional dependency on the key",
                  "Transitive dependency",
                  "No dependency"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which anomaly prevents adding a new course without a student enrolled?",
                "options": [
                  "Update anomaly",
                  "Deletion anomaly",
                  "Insertion anomaly",
                  "Redundancy anomaly"
                ],
                "answerIndex": 2
              },
              {
                "question": "Roll_No → Dept and Dept → HOD together imply:",
                "options": [
                  "HOD → Roll_No",
                  "Roll_No → HOD (transitive FD)",
                  "Dept → Roll_No",
                  "No additional FD"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Study the STUDENT_COURSE relation schema and its sample data provided in the Simulation tab",
              "Identify the update anomaly: point to a specific attribute that would need updating in multiple rows",
              "Identify the insertion anomaly: describe data that cannot be stored without other required data",
              "Identify the deletion anomaly: describe which data is unintentionally lost when a row is deleted",
              "List all functional dependencies: identify each determinant and its dependent attributes",
              "Identify the candidate key(s) of the relation",
              "Classify each non-key attribute's dependency as full, partial, or transitive",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Unnormalized relation STUDENT_COURSE\nCREATE TABLE STUDENT_COURSE (\n    Roll_No     INT,\n    Name        VARCHAR(50),\n    Dept        VARCHAR(20),\n    HOD         VARCHAR(50),\n    Course_ID   VARCHAR(10),\n    Course_Name VARCHAR(50),\n    Credits     INT,\n    Instructor  VARCHAR(50),\n    Marks       INT\n);\n\nINSERT INTO STUDENT_COURSE VALUES\n  (101,'Alice','CSE','Dr. Sharma','CS101','Database Systems',4,'Dr. Rao',85),\n  (101,'Alice','CSE','Dr. Sharma','CS102','Operating Systems',3,'Dr. Singh',78),\n  (102,'Bob','IT','Dr. Gupta','CS101','Database Systems',4,'Dr. Rao',72),\n  (103,'Carol','CSE','Dr. Sharma','CS101','Database Systems',4,'Dr. Rao',91),\n  (103,'Carol','CSE','Dr. Sharma','CS103','Networks',3,'Dr. Mehta',88);\n\n-- Anomaly 1: UPDATE — changing HOD of CSE requires updating ALL CSE rows\n-- UPDATE STUDENT_COURSE SET HOD='Dr. Verma' WHERE Dept='CSE';\n-- If only Row 1 is updated, inconsistency arises.\n\n-- Anomaly 2: INSERT — cannot add new course 'CS104' without a student\n-- INSERT INTO STUDENT_COURSE VALUES (NULL,NULL,NULL,NULL,'CS104','AI',4,'Dr. Patel',NULL);\n-- Roll_No is part of PK — cannot be NULL.\n\n-- Anomaly 3: DELETE — deleting Bob (102) removes the only evidence of CS101 marks for IT\n-- DELETE FROM STUDENT_COURSE WHERE Roll_No=102;\n\n-- Functional Dependencies identified:\n-- Roll_No → Name, Dept, HOD\n-- Dept → HOD\n-- Course_ID → Course_Name, Credits, Instructor\n-- {Roll_No, Course_ID} → Marks\n-- Primary Key: {Roll_No, Course_ID}\nSELECT * FROM STUDENT_COURSE;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "STUDENT_COURSE mixes student, department, course, and enrollment data in one relation",
                  "memory": [],
                  "output": "5 rows: Alice appears twice (CS101, CS102); Carol appears twice (CS101, CS103)"
                },
                {
                  "line": 2,
                  "annotation": "Update Anomaly: HOD 'Dr. Sharma' for CSE appears 3 times — must be updated in all 3 rows consistently",
                  "memory": [],
                  "output": "Risk: partial update of HOD creates inconsistency across rows"
                },
                {
                  "line": 3,
                  "annotation": "Insertion Anomaly: Cannot add Course CS104 without a student (Roll_No is part of PK, cannot be NULL)",
                  "memory": [],
                  "output": "Constraint violation: Roll_No cannot be NULL"
                },
                {
                  "line": 4,
                  "annotation": "Deletion Anomaly: Deleting Bob(102) removes the only record linking IT students to CS101",
                  "memory": [],
                  "output": "After DELETE: CS101 for IT dept information is lost"
                },
                {
                  "line": 5,
                  "annotation": "FDs: Roll_No→Name,Dept,HOD | Dept→HOD | Course_ID→Course_Name,Credits,Instructor | {Roll_No,Course_ID}→Marks",
                  "memory": [],
                  "output": "Primary Key: {Roll_No, Course_ID}. Transitive: Roll_No→Dept→HOD"
                }
              ]
            },
            "posttest": [
              {
                "question": "In STUDENT_COURSE, deleting the only row for student 102 (Bob) causes:",
                "options": [
                  "Update anomaly",
                  "Insertion anomaly",
                  "Deletion anomaly — Bob's enrollment and CS101-IT data are lost together",
                  "No anomaly"
                ],
                "answerIndex": 2
              },
              {
                "question": "The FD Dept → HOD in STUDENT_COURSE indicates a:",
                "options": [
                  "Full FD on the primary key",
                  "Partial FD (Dept is part of the key {Roll_No, Course_ID})",
                  "Transitive FD through Roll_No",
                  "Trivial FD"
                ],
                "answerIndex": 2
              },
              {
                "question": "What is the primary key of STUDENT_COURSE?",
                "options": [
                  "Roll_No",
                  "Course_ID",
                  "{Roll_No, Course_ID}",
                  "{Roll_No, Name, Course_ID}"
                ],
                "answerIndex": 2
              },
              {
                "question": "The FD Roll_No → HOD via Dept is an example of:",
                "options": [
                  "Partial dependency",
                  "Transitive dependency",
                  "Full dependency",
                  "Multivalued dependency"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which FD represents a full functional dependency on the primary key?",
                "options": [
                  "Roll_No → Name",
                  "Course_ID → Credits",
                  "{Roll_No, Course_ID} → Marks",
                  "Dept → HOD"
                ],
                "answerIndex": 2
              }
            ],
            references: [
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 15: Schema Refinement and Normal Forms (Sections 15.1-15.4 on Anomalies and FDs)",
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 7: Database Design (Sections 7.1-7.2 on Anomalies and FDs)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 10: Functional Dependencies and Normalization",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 15: Functional Dependencies",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 6: Functional Dependencies and Anomalies"
              ]
          }
        },
        {
          "id": "db-w10-2",
          "title": "Converting to 1NF, 2NF, 3NF",
          "desc": "Decompose STUDENT_COURSE through normalization stages: (a) Convert to 1NF (atomic attributes, no repeating groups), (b) Identify partial dependencies and convert to 2NF, (c) Identify transitive dependencies and convert to 3NF.",
          "expected": "Correctly decomposed relations at each normal form stage with FDs preserved; lossless decomposition verified",
          "content": {
            "aim": {
              "text": "In this experiment, the student will systematically normalize the STUDENT_COURSE relation to 1NF, 2NF, and 3NF. The student will:",
              "bullets": [
                "Convert an unnormalized relation to 1NF by ensuring atomic attributes and removing repeating groups",
                "Identify partial functional dependencies in a 1NF relation with a composite key",
                "Decompose to 2NF by eliminating partial dependencies into separate relations",
                "Identify transitive functional dependencies in a 2NF relation",
                "Decompose to 3NF by eliminating transitive dependencies",
                "Verify that the decomposition is lossless-join and dependency-preserving"
              ]
            },
            "theory": [
              {
                "title": "First Normal Form (1NF)",
                "body": [
                  "A relation is in 1NF if: (1) All attributes have atomic (indivisible) values, (2) There are no repeating groups or arrays, (3) All rows are unique (a primary key exists).",
                  "Example violation: Phone = '9876543210, 9123456789' (multi-valued in one cell) violates 1NF.",
                  "Fix: Store each phone number in a separate row, or create a separate PHONE table."
                ]
              },
              {
                "title": "Second Normal Form (2NF)",
                "body": [
                  "A relation is in 2NF if: (1) It is in 1NF, and (2) Every non-key attribute is fully functionally dependent on the primary key (no partial dependencies).",
                  "Partial dependency: A non-key attribute depends on only part of a composite primary key.",
                  "In STUDENT_COURSE: Roll_No → Name (partial — Roll_No alone determines Name, but key is {Roll_No, Course_ID}).",
                  "2NF Fix: Decompose into STUDENT(Roll_No, Name, Dept, HOD) and COURSE(Course_ID, Course_Name, Credits, Instructor) and ENROLLMENT(Roll_No, Course_ID, Marks)."
                ]
              },
              {
                "title": "Third Normal Form (3NF)",
                "body": [
                  "A relation is in 3NF if: (1) It is in 2NF, and (2) There are no transitive dependencies — no non-key attribute determines another non-key attribute.",
                  "Transitive dependency: Roll_No → Dept → HOD (HOD depends transitively on Roll_No through Dept).",
                  "3NF Fix: Decompose STUDENT(Roll_No, Name, Dept, HOD) into STUDENT(Roll_No, Name, Dept_ID) and DEPARTMENT(Dept_ID, Dept_Name, HOD).",
                  "3NF Test (alternative): A relation is in 3NF if for every FD X → A, either X is a superkey, or A is a prime attribute (part of some candidate key)."
                ]
              },
              {
                "title": "Lossless-Join and Dependency Preservation",
                "body": [
                  "Lossless-join: Decomposition R → R1, R2 is lossless if R1 ⋈ R2 = R. Guaranteed if R1 ∩ R2 is a superkey of R1 or R2.",
                  "Dependency preservation: All FDs of R can be checked within individual decomposed relations without joining.",
                  "3NF decomposition always guarantees both lossless-join and dependency preservation; BCNF may not preserve all dependencies."
                ]
              }
            ],
            "pretest": [
              {
                "question": "A relation is NOT in 1NF if:",
                "options": [
                  "It has a composite primary key",
                  "An attribute contains a set of values (non-atomic)",
                  "It has transitive dependencies",
                  "It has more than 3 columns"
                ],
                "answerIndex": 1
              },
              {
                "question": "Partial functional dependency arises when:",
                "options": [
                  "A non-key attribute depends on a transitive chain",
                  "A non-key attribute depends on only part of a composite key",
                  "The primary key has only one attribute",
                  "Two non-key attributes depend on each other"
                ],
                "answerIndex": 1
              },
              {
                "question": "In 2NF, which of the following is eliminated?",
                "options": [
                  "Transitive dependencies",
                  "Partial dependencies",
                  "Multi-valued dependencies",
                  "All redundancy"
                ],
                "answerIndex": 1
              },
              {
                "question": "A relation with a single-attribute primary key is automatically in:",
                "options": [
                  "1NF only",
                  "1NF and 2NF (no partial dependencies possible)",
                  "3NF",
                  "BCNF"
                ],
                "answerIndex": 1
              },
              {
                "question": "Roll_No → Dept → HOD is an example of:",
                "options": [
                  "Partial dependency",
                  "Transitive dependency",
                  "Multi-valued dependency",
                  "Full dependency"
                ],
                "answerIndex": 1
              }
            ],
            "procedure": [
              "Start with STUDENT_COURSE and identify any 1NF violations (assume already in 1NF — atomic values)",
              "Identify partial FDs: Roll_No → Name, Dept, HOD and Course_ID → Course_Name, Credits, Instructor",
              "Decompose to 2NF: create STUDENT, COURSE, ENROLLMENT tables",
              "Verify 2NF: check that no partial dependencies remain in each relation",
              "Identify transitive FD in STUDENT: Roll_No → Dept → HOD",
              "Decompose to 3NF: split STUDENT into STUDENT and DEPARTMENT",
              "Create the SQL tables for each 3NF relation and insert data",
              "Verify that the natural join of all 3NF tables reconstructs the original STUDENT_COURSE relation",
              "Proceed to Posttest"
            ],
            "simulation": {
              "code": "-- Step 1: 1NF — already satisfied (all attributes atomic)\n-- STUDENT_COURSE is in 1NF with PK = {Roll_No, Course_ID}\n\n-- Step 2: Identify Partial FDs\n-- Roll_No → Name, Dept, HOD  (Roll_No alone determines these — PARTIAL)\n-- Course_ID → Course_Name, Credits, Instructor  (Course_ID alone determines these — PARTIAL)\n-- {Roll_No, Course_ID} → Marks  (FULL FD on composite key)\n\n-- Step 3: Decompose to 2NF\nCREATE TABLE STUDENT_2NF (\n    Roll_No INT PRIMARY KEY,\n    Name    VARCHAR(50) NOT NULL,\n    Dept    VARCHAR(20),\n    HOD     VARCHAR(50)\n);\nCREATE TABLE COURSE_2NF (\n    Course_ID   VARCHAR(10) PRIMARY KEY,\n    Course_Name VARCHAR(50),\n    Credits     INT,\n    Instructor  VARCHAR(50)\n);\nCREATE TABLE ENROLLMENT_2NF (\n    Roll_No   INT,\n    Course_ID VARCHAR(10),\n    Marks     INT,\n    PRIMARY KEY (Roll_No, Course_ID),\n    FOREIGN KEY (Roll_No) REFERENCES STUDENT_2NF(Roll_No),\n    FOREIGN KEY (Course_ID) REFERENCES COURSE_2NF(Course_ID)\n);\n\n-- Verify 2NF: no partial dependencies in any relation\n-- STUDENT_2NF: PK=Roll_No (single attr) — 2NF trivially satisfied for Name,Dept,HOD\n-- COURSE_2NF: PK=Course_ID (single attr) — 2NF trivially satisfied\n-- ENROLLMENT_2NF: only non-key attr is Marks, fully dependent on {Roll_No,Course_ID}\n\n-- Step 4: Identify Transitive FD in STUDENT_2NF\n-- Roll_No → Dept and Dept → HOD  =>  Roll_No →(transitively)→ HOD\n\n-- Step 5: Decompose to 3NF\nCREATE TABLE DEPARTMENT_3NF (\n    Dept    VARCHAR(20) PRIMARY KEY,\n    HOD     VARCHAR(50)\n);\nCREATE TABLE STUDENT_3NF (\n    Roll_No INT PRIMARY KEY,\n    Name    VARCHAR(50) NOT NULL,\n    Dept    VARCHAR(20),\n    FOREIGN KEY (Dept) REFERENCES DEPARTMENT_3NF(Dept)\n);\n\n-- Populate\nINSERT INTO DEPARTMENT_3NF VALUES ('CSE','Dr. Sharma'),('IT','Dr. Gupta');\nINSERT INTO STUDENT_3NF VALUES (101,'Alice','CSE'),(102,'Bob','IT'),(103,'Carol','CSE');\nINSERT INTO COURSE_2NF VALUES ('CS101','Database Systems',4,'Dr. Rao'),('CS102','OS',3,'Dr. Singh'),('CS103','Networks',3,'Dr. Mehta');\nINSERT INTO ENROLLMENT_2NF VALUES (101,'CS101',85),(101,'CS102',78),(102,'CS101',72),(103,'CS101',91),(103,'CS103',88);\n\n-- Verify lossless join: reconstruct original relation\nSELECT S.Roll_No, S.Name, S.Dept, D.HOD, E.Course_ID, C.Course_Name, C.Credits, C.Instructor, E.Marks\nFROM STUDENT_3NF S\nJOIN DEPARTMENT_3NF D ON S.Dept = D.Dept\nJOIN ENROLLMENT_2NF E ON S.Roll_No = E.Roll_No\nJOIN COURSE_2NF C ON E.Course_ID = C.Course_ID;",
              "steps": [
                {
                  "line": 1,
                  "annotation": "1NF: all values are atomic, PK={Roll_No,Course_ID} exists. Proceed to check for partial FDs.",
                  "memory": [],
                  "output": "1NF satisfied"
                },
                {
                  "line": 2,
                  "annotation": "2NF decomposition: 3 relations — STUDENT_2NF, COURSE_2NF, ENROLLMENT_2NF. Partial FDs removed.",
                  "memory": [],
                  "output": "Tables created: STUDENT_2NF, COURSE_2NF, ENROLLMENT_2NF"
                },
                {
                  "line": 3,
                  "annotation": "Transitive FD found in STUDENT_2NF: Roll_No→Dept→HOD. Violates 3NF.",
                  "memory": [],
                  "output": "Transitive dependency: Roll_No → Dept → HOD"
                },
                {
                  "line": 4,
                  "annotation": "3NF decomposition: DEPARTMENT_3NF(Dept,HOD) and STUDENT_3NF(Roll_No,Name,Dept). Transitive FD removed.",
                  "memory": [],
                  "output": "4 relations in 3NF: STUDENT_3NF, DEPARTMENT_3NF, COURSE_2NF, ENROLLMENT_2NF"
                },
                {
                  "line": 5,
                  "annotation": "Lossless join reconstruction: natural join of all 4 tables returns original STUDENT_COURSE data",
                  "memory": [],
                  "output": "5 rows matching original STUDENT_COURSE exactly"
                }
              ]
            },
            "posttest": [
              {
                "question": "After 2NF decomposition of STUDENT_COURSE, how many relations are created?",
                "options": [
                  "2",
                  "3",
                  "4",
                  "1"
                ],
                "answerIndex": 1
              },
              {
                "question": "Which relation still violates 3NF after the 2NF decomposition?",
                "options": [
                  "ENROLLMENT_2NF",
                  "COURSE_2NF",
                  "STUDENT_2NF (Roll_No→Dept→HOD)",
                  "None — 2NF implies 3NF"
                ],
                "answerIndex": 2
              },
              {
                "question": "After full 3NF decomposition, STUDENT_3NF contains which attributes?",
                "options": [
                  "Roll_No, Name, Dept, HOD",
                  "Roll_No, Name, Dept",
                  "Roll_No, Dept, HOD",
                  "Roll_No, Name, Dept, HOD, Course_ID"
                ],
                "answerIndex": 1
              },
              {
                "question": "The 3NF decomposition guarantees:",
                "options": [
                  "No redundancy at all",
                  "Both lossless-join and dependency preservation",
                  "Lossless-join only",
                  "Dependency preservation only"
                ],
                "answerIndex": 1
              },
              {
                "question": "A relation R(A,B,C) with A as PK and FD B→C is in:",
                "options": [
                  "1NF only",
                  "2NF but not 3NF",
                  "3NF",
                  "BCNF"
                ],
                "answerIndex": 1
              }
            ],
            references: [
                "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 15: Schema Refinement (Sections 15.5-15.6 on 1NF, 2NF, 3NF)",
                "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 7: Database Design (Sections 7.3-7.5 on Normalization to 3NF)",
                "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 10: Normalization to 1NF, 2NF, and 3NF",
                "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 16: Normalization — 1NF, 2NF, 3NF",
                "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 6: Normalization to 3NF"
              ]
          }
        }
      ]
    },
    
  {
    "title": "WEEK 11",
    "objective": "BCNF, 4NF (Multi-valued Dependencies) and 5NF decomposition",
    "tutorial": "Tutorial 11: Normalization — Part 2",
    "labTitle": "Lab 11: Advanced Normal Forms",
    "experiments": [
      {
        "id": "db-w11-1",
        "title": "BCNF Decomposition",
        "desc": "Given relation R(A, B, C, D) with FDs: AB→C, C→B: (a) Find all candidate keys, (b) Check if the relation is in BCNF, (c) If not, decompose into BCNF and verify lossless-join using the common attribute rule.",
        "expected": "Candidate keys correctly identified; BCNF violation found; lossless BCNF decomposition produced; potential dependency loss noted",
        "content": {
          "aim": {
            "text": "In this experiment, the student will analyze a relation for BCNF compliance and perform BCNF decomposition. The student will:",
            "bullets": [
              "Compute attribute closures to find candidate keys",
              "Test each FD against the BCNF condition: for every FD X→Y, X must be a superkey",
              "Identify BCNF-violating FDs",
              "Decompose the relation into BCNF using the standard algorithm",
              "Verify lossless-join property of the decomposition",
              "Recognize cases where BCNF decomposition sacrifices dependency preservation"
            ]
          },
          "theory": [
            {
              "title": "Boyce-Codd Normal Form (BCNF)",
              "body": [
                "A relation R is in BCNF if for every non-trivial FD X → Y in R, X is a superkey of R.",
                "BCNF is stronger than 3NF: 3NF allows X → A where A is a prime attribute; BCNF does not.",
                "Every relation in BCNF is also in 3NF, but the converse is not always true.",
                "BCNF eliminates all redundancy due to functional dependencies."
              ]
            },
            {
              "title": "Attribute Closure",
              "body": [
                "The closure of X under a set of FDs F, written X+, is the set of all attributes functionally determined by X.",
                "Algorithm: Start with X+ = X; repeatedly add attributes determined by any FD whose left side is in X+.",
                "X is a superkey if X+ includes all attributes of R.",
                "X is a candidate key if X is a superkey and no proper subset of X is a superkey."
              ]
            },
            {
              "title": "BCNF Decomposition Algorithm",
              "body": [
                "Step 1: Find a BCNF-violating FD X → Y (X is not a superkey).",
                "Step 2: Decompose R into: R1 = X ∪ Y (the violating FD), R2 = R − Y + X (original relation minus Y, keeping X).",
                "Step 3: Repeat for R1 and R2 if they are not in BCNF.",
                "The decomposition is guaranteed to be lossless (R1 ∩ R2 = X is a key of R1).",
                "Dependency preservation is NOT guaranteed — some FDs may span both decomposed relations."
              ]
            },
            {
              "title": "BCNF vs 3NF Trade-offs",
              "body": [
                "BCNF always achieves lossless decomposition but may lose dependency preservation.",
                "3NF always achieves both lossless and dependency-preserving decomposition but may leave some redundancy.",
                "In practice: prefer 3NF when dependency preservation is critical; prefer BCNF for maximum redundancy elimination."
              ]
            }
          ],
          "pretest": [
            {
              "question": "A relation is in BCNF if for every non-trivial FD X → Y:",
              "options": [
                "Y is a prime attribute",
                "X is a superkey",
                "X is a candidate key only",
                "Y contains all attributes"
              ],
              "answerIndex": 1
            },
            {
              "question": "The closure of attribute set X, written X+, represents:",
              "options": [
                "All attributes that determine X",
                "All attributes determined by X under the given FDs",
                "The primary key of X",
                "The set of all candidate keys"
              ],
              "answerIndex": 1
            },
            {
              "question": "BCNF guarantees:",
              "options": [
                "Dependency preservation always",
                "Lossless decomposition always",
                "Both lossless and dependency preservation",
                "Elimination of multi-valued dependencies"
              ],
              "answerIndex": 1
            },
            {
              "question": "Given R(A,B,C) with FDs A→B and B→C and B→A. What are the candidate keys?",
              "options": [
                "{A} and {B} only",
                "{A}, {B}, and {C}",
                "{A,B}",
                "{A,B,C}"
              ],
              "answerIndex": 0
            },
            {
              "question": "BCNF is stricter than 3NF because:",
              "options": [
                "BCNF requires more tables",
                "BCNF does not allow non-key attributes to depend on prime attributes",
                "3NF allows X→A if A is a prime attribute; BCNF requires X to always be a superkey",
                "3NF has more normal form checks"
              ],
              "answerIndex": 2
            }
          ],
          "procedure": [
            "Given R(A,B,C,D) with FDs: AB→C, C→B",
            "Compute (AB)+ to check if AB is a candidate key",
            "Compute (C)+ to determine what C determines",
            "List all candidate keys of R",
            "Check each FD: is AB a superkey? Is C a superkey? Identify BCNF violations",
            "Apply BCNF decomposition: identify the violating FD and decompose",
            "Check if each decomposed relation is in BCNF",
            "Verify lossless join: R1 ∩ R2 should be a superkey of R1 or R2",
            "Note any FDs that are no longer enforceable in a single relation",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Given: R(A, B, C, D) with FDs: AB→C, C→B\n-- Step 1: Compute attribute closures\n-- (AB)+ = {A,B} + C (from AB→C) + B (C→B, already in set) = {A,B,C}\n-- (AB)+ does NOT include D → AB is not a superkey\n-- Try (ABD)+: {A,B,D} + C (from AB→C) + B = {A,B,C,D} → ABD is a superkey\n-- Candidate Key 1: ABD\n-- Try (CD)+: {C,D} + B (from C→B) = {B,C,D} → CD does not determine A → not a superkey\n-- Try (ACD)+: {A,C,D} + B (from C→B) = {A,B,C,D} → ACD is a superkey\n-- Is ACD minimal? Remove A: CD → {B,C,D} ≠ R. Remove C: AD → AD ≠ R. Remove D: AC → {A,B,C} ≠ R.\n-- So ACD is a candidate key.\n-- Candidate Keys: {ABD} and {ACD}\n\n-- Step 2: Check BCNF\n-- FD1: AB → C. Is AB a superkey? (AB)+ = {A,B,C} ≠ R. AB is NOT a superkey. BCNF VIOLATED.\n-- FD2: C → B. Is C a superkey? C+ = {B,C} ≠ R. C is NOT a superkey. BCNF VIOLATED.\n\n-- Step 3: BCNF Decomposition using C→B (violating FD)\n-- R1 = {C, B} (attributes of C and B) → R1(B, C)\n-- R2 = R - {B} + {C} = {A, C, D} → R2(A, C, D)\n-- Note: FD AB→C cannot be checked in R2 alone (A and B are in different relations).\n\n-- Step 4: Check BCNF of R1(B,C) with FD C→B\n-- In R1: C+ = {B,C} = all attributes of R1. C is a superkey of R1.\n-- R1 is in BCNF.\n\n-- Step 5: Check BCNF of R2(A,C,D)\n-- FDs applicable to R2: ACD is the candidate key (from projection)\n-- No non-trivial FDs with non-superkey left side exist in R2.\n-- R2 is in BCNF.\n\n-- SQL Representation of BCNF decomposition:\nCREATE TABLE R1_BCNF (C VARCHAR(5), B VARCHAR(5), PRIMARY KEY(C));\nCREATE TABLE R2_BCNF (A VARCHAR(5), C VARCHAR(5), D VARCHAR(5),\n    PRIMARY KEY(A,C,D), FOREIGN KEY(C) REFERENCES R1_BCNF(C));\n\n-- Lossless join verification: R1 ∩ R2 = {C}; C is PK of R1 → lossless guaranteed\n-- Lost FD: AB→C spans R1 and R2 — cannot be verified without joining",
            "steps": [
              {
                "line": 1,
                "annotation": "Compute closures: (AB)+ = {A,B,C}, (ABD)+ = {A,B,C,D} → ABD is candidate key",
                "memory": [],
                "output": "Candidate Keys: {A,B,D} and {A,C,D}"
              },
              {
                "line": 2,
                "annotation": "Check BCNF: AB not a superkey (AB+ ≠ R) → AB→C violates BCNF. C not a superkey (C+ ≠ R) → C→B violates BCNF.",
                "memory": [],
                "output": "BCNF violations: AB→C and C→B"
              },
              {
                "line": 3,
                "annotation": "Decompose using C→B: R1(B,C) and R2(A,C,D)",
                "memory": [],
                "output": "R1(B,C) with FD C→B; R2(A,C,D)"
              },
              {
                "line": 4,
                "annotation": "R1: C is a superkey of R1(B,C) → R1 is in BCNF",
                "memory": [],
                "output": "R1 in BCNF"
              },
              {
                "line": 5,
                "annotation": "Lossless check: R1 ∩ R2 = {C} = PK of R1 → lossless. FD AB→C lost across decomposition.",
                "memory": [],
                "output": "Lossless: YES. Dependency preserving: NO (AB→C cannot be enforced in a single relation)"
              }
            ]
          },
          "posttest": [
            {
              "question": "Given R(A,B,C,D) with candidate keys {ABD} and {ACD}, the prime attributes are:",
              "options": [
                "{A,B,C,D} — all are prime",
                "{A,B,D}",
                "{A,C,D}",
                "{A,B,C,D} — A,B,C,D all appear in some candidate key"
              ],
              "answerIndex": 3
            },
            {
              "question": "After BCNF decomposition into R1(B,C) and R2(A,C,D), which FD is lost?",
              "options": [
                "C → B",
                "AB → C",
                "A → D",
                "No FD is lost"
              ],
              "answerIndex": 1
            },
            {
              "question": "The lossless-join property of BCNF decomposition using X→Y is guaranteed because:",
              "options": [
                "Y is always a superkey",
                "R1 ∩ R2 = X, and X is a key of R1",
                "R1 ∩ R2 = Y, and Y is a key of R2",
                "BCNF always preserves all FDs"
              ],
              "answerIndex": 1
            },
            {
              "question": "A relation R with only one candidate key (single attribute) that satisfies 3NF is:",
              "options": [
                "Always in BCNF",
                "Never in BCNF",
                "In BCNF only if no FDs exist",
                "In BCNF only if the key is composite"
              ],
              "answerIndex": 0
            },
            {
              "question": "Which statement about BCNF is correct?",
              "options": [
                "Every 3NF relation is in BCNF",
                "Every BCNF relation is in 3NF",
                "BCNF and 3NF are equivalent",
                "BCNF is weaker than 3NF"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 15: Schema Refinement (Sections 15.7-15.8 on BCNF)",
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 7: Database Design (Section 7.6 on BCNF)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 11: Boyce-Codd Normal Form (BCNF)",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 16: BCNF and Decomposition",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 6: BCNF and Decomposition"
          ]
        }
      },
      {
        "id": "db-w11-2",
        "title": "Multi-valued Dependencies and 4NF",
        "desc": "Given relation EMPLOYEE_SKILLS_PROJECTS(Emp_ID, Skill, Project): (a) Identify the multi-valued dependency, (b) Show the redundancy introduced by MVDs, (c) Decompose into 4NF and verify lossless-join.",
        "expected": "MVD correctly identified; redundancy demonstrated with example tuples; 4NF decomposition produces two relations, lossless-join verified",
        "content": {
          "aim": {
            "text": "In this experiment, the student will identify multi-valued dependencies and perform 4NF decomposition. The student will:",
            "bullets": [
              "Define and identify a multi-valued dependency (MVD) in a relation",
              "Show why MVDs cause redundancy even in BCNF relations",
              "Apply the 4NF definition: for every non-trivial MVD X ↠ Y, X must be a superkey",
              "Decompose a relation with an MVD into two relations to achieve 4NF",
              "Verify lossless-join of the 4NF decomposition"
            ]
          },
          "theory": [
            {
              "title": "Multi-valued Dependency (MVD)",
              "body": [
                "A multi-valued dependency X ↠ Y (X multi-determines Y) holds in relation R if: for every pair of tuples t1, t2 in R that agree on X, there exist tuples t3, t4 in R such that t3[X]=t4[X]=t1[X], t3[Y]=t1[Y], t3[Z]=t2[Z], t4[Y]=t2[Y], t4[Z]=t1[Z], where Z = R − X − Y.",
                "Informally: X ↠ Y means the set of Y-values for a given X is independent of the Z-values.",
                "Every FD X → Y is also an MVD X ↠ Y (trivially). Non-trivial MVDs arise when there are truly independent multi-valued attributes."
              ]
            },
            {
              "title": "Example of MVD Redundancy",
              "body": [
                "EMPLOYEE_SKILLS_PROJECTS(Emp_ID, Skill, Project): An employee has a set of skills and a set of projects, but skills and projects are independent of each other.",
                "MVDs: Emp_ID ↠ Skill and Emp_ID ↠ Project.",
                "If Alice has skills {Java, Python} and projects {P1, P2}, the table must have all 4 combinations: (Alice,Java,P1), (Alice,Java,P2), (Alice,Python,P1), (Alice,Python,P2).",
                "Adding a new project P3 requires adding (Alice,Java,P3) AND (Alice,Python,P3) — redundancy and update anomaly."
              ]
            },
            {
              "title": "Fourth Normal Form (4NF)",
              "body": [
                "A relation R is in 4NF if for every non-trivial MVD X ↠ Y in R, X is a superkey of R.",
                "4NF is stronger than BCNF: a relation can be in BCNF but violate 4NF due to MVDs.",
                "4NF Decomposition: Split R(X, Y, Z) with MVD X ↠ Y into R1(X, Y) and R2(X, Z).",
                "This decomposition is always lossless: R1 ⋈ R2 = R."
              ]
            }
          ],
          "pretest": [
            {
              "question": "A multi-valued dependency X ↠ Y holds when:",
              "options": [
                "X uniquely determines Y",
                "The set of Y values for a given X is independent of other attributes",
                "Y determines X",
                "X and Y are in a many-to-many relationship"
              ],
              "answerIndex": 1
            },
            {
              "question": "A relation in BCNF can still violate 4NF if it has:",
              "options": [
                "A transitive FD",
                "A partial FD",
                "A non-trivial MVD where the determinant is not a superkey",
                "A composite primary key"
              ],
              "answerIndex": 2
            },
            {
              "question": "EMPLOYEE_SKILLS_PROJECTS(Emp_ID, Skill, Project) with Emp_ID ↠ Skill is decomposed into:",
              "options": [
                "(Emp_ID, Skill) and (Emp_ID, Project)",
                "(Emp_ID, Skill, Project) unchanged",
                "(Skill, Project) and (Emp_ID)",
                "(Emp_ID, Skill) and (Skill, Project)"
              ],
              "answerIndex": 0
            },
            {
              "question": "4NF decomposition is guaranteed to be:",
              "options": [
                "Dependency preserving only",
                "Lossless only",
                "Both lossless and dependency preserving",
                "Neither"
              ],
              "answerIndex": 1
            },
            {
              "question": "Every FD X → Y implies the MVD:",
              "options": [
                "Y ↠ X",
                "X ↠ Y",
                "X → Y only (FD does not imply MVD)",
                "Z ↠ XY where Z is remaining"
              ],
              "answerIndex": 1
            }
          ],
          "procedure": [
            "Study the EMPLOYEE_SKILLS_PROJECTS relation and its sample data",
            "Identify the MVDs: Emp_ID ↠ Skill and Emp_ID ↠ Project",
            "Show that adding a new skill for Alice requires adding multiple rows (one per project)",
            "Verify that the relation is in BCNF (primary key is {Emp_ID, Skill, Project})",
            "Apply 4NF decomposition: split into EMP_SKILL(Emp_ID, Skill) and EMP_PROJECT(Emp_ID, Project)",
            "Create SQL tables for the 4NF relations and insert data",
            "Verify lossless join: join EMP_SKILL and EMP_PROJECT on Emp_ID and compare with original",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Original BCNF-but-not-4NF relation\nCREATE TABLE EMP_SKILL_PROJECT (\n    Emp_ID  INT,\n    Skill   VARCHAR(30),\n    Project VARCHAR(30),\n    PRIMARY KEY (Emp_ID, Skill, Project)\n);\n\nINSERT INTO EMP_SKILL_PROJECT VALUES\n  (1,'Java','P1'),(1,'Java','P2'),\n  (1,'Python','P1'),(1,'Python','P2'),\n  (2,'C++','P3'),(2,'C++','P4'),\n  (2,'Java','P3'),(2,'Java','P4');\n\n-- MVD: Emp_ID ↠ Skill (independent of Project)\n-- MVD: Emp_ID ↠ Project (independent of Skill)\n-- PK = {Emp_ID,Skill,Project} → in BCNF (no non-trivial FDs at all)\n-- But MVD Emp_ID↠Skill with Emp_ID not a superkey → violates 4NF\n\n-- Show redundancy: add new project P5 for Employee 1\n-- Must insert (1,'Java','P5') AND (1,'Python','P5') — 2 rows for 1 fact\n\n-- 4NF Decomposition\nCREATE TABLE EMP_SKILL (\n    Emp_ID INT,\n    Skill  VARCHAR(30),\n    PRIMARY KEY (Emp_ID, Skill)\n);\nCREATE TABLE EMP_PROJECT (\n    Emp_ID  INT,\n    Project VARCHAR(30),\n    PRIMARY KEY (Emp_ID, Project)\n);\n\nINSERT INTO EMP_SKILL VALUES (1,'Java'),(1,'Python'),(2,'C++'),(2,'Java');\nINSERT INTO EMP_PROJECT VALUES (1,'P1'),(1,'P2'),(2,'P3'),(2,'P4');\n\n-- Now adding P5 for Employee 1 requires only 1 row:\nINSERT INTO EMP_PROJECT VALUES (1,'P5');\n\n-- Lossless join verification\nSELECT E.Emp_ID, E.Skill, P.Project\nFROM EMP_SKILL E\nJOIN EMP_PROJECT P ON E.Emp_ID = P.Emp_ID\nORDER BY E.Emp_ID, E.Skill, P.Project;",
            "steps": [
              {
                "line": 1,
                "annotation": "Original table: 8 rows for 2 employees. Employee 1 has 2 skills × 2 projects = 4 rows.",
                "memory": [],
                "output": "8 rows: all combinations of skills and projects per employee"
              },
              {
                "line": 2,
                "annotation": "MVD: Emp_ID↠Skill holds (skills are independent of projects). Emp_ID not a superkey → 4NF violated.",
                "memory": [],
                "output": "4NF violation: Emp_ID ↠ Skill (Emp_ID is not a superkey)"
              },
              {
                "line": 3,
                "annotation": "4NF decomposition: EMP_SKILL(Emp_ID,Skill) and EMP_PROJECT(Emp_ID,Project)",
                "memory": [],
                "output": "EMP_SKILL: 4 rows. EMP_PROJECT: 4 rows."
              },
              {
                "line": 4,
                "annotation": "Adding P5 for Employee 1 now requires only 1 INSERT into EMP_PROJECT — no redundancy",
                "memory": [],
                "output": "1 INSERT vs 2 INSERTs in original table"
              },
              {
                "line": 5,
                "annotation": "Lossless join: EMP_SKILL ⋈ EMP_PROJECT on Emp_ID = original 8 rows",
                "memory": [],
                "output": "Join produces exactly the 8 original rows — lossless confirmed"
              }
            ]
          },
          "posttest": [
            {
              "question": "In EMPLOYEE_SKILLS_PROJECTS, why is the relation in BCNF but not 4NF?",
              "options": [
                "It has a transitive FD",
                "There are no non-trivial FDs, but there is a non-trivial MVD with a non-superkey determinant",
                "The primary key is wrong",
                "BCNF and 4NF are the same"
              ],
              "answerIndex": 1
            },
            {
              "question": "After 4NF decomposition into EMP_SKILL and EMP_PROJECT, adding a new project for an employee requires:",
              "options": [
                "Inserting into both EMP_SKILL and EMP_PROJECT",
                "Inserting into EMP_SKILL only",
                "Inserting into EMP_PROJECT only (one row)",
                "No insertion needed"
              ],
              "answerIndex": 2
            },
            {
              "question": "The lossless-join of R1(X,Y) and R2(X,Z) from MVD decomposition is guaranteed because:",
              "options": [
                "X is a superkey in both R1 and R2",
                "X = R1 ∩ R2 is a superkey of R1 (and R2)",
                "Y and Z are disjoint",
                "MVD decomposition is always dependency preserving"
              ],
              "answerIndex": 1
            },
            {
              "question": "If Emp_ID ↠ Skill holds, which of the following must also hold?",
              "options": [
                "Emp_ID → Skill",
                "Emp_ID ↠ Project (complement rule: if X↠Y in R(X,Y,Z) then X↠Z)",
                "Skill → Emp_ID",
                "Project ↠ Skill"
              ],
              "answerIndex": 1
            },
            {
              "question": "A relation with only FDs (no non-trivial MVDs) and in BCNF is automatically in:",
              "options": [
                "3NF only",
                "4NF",
                "5NF",
                "1NF only"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 15: Schema Refinement (Section 15.9 on Multi-valued Dependencies and 4NF)",
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 7: Database Design (Section 7.7 on MVD and 4NF)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 11: Multi-valued Dependencies and 4NF",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 16: MVDs and 4NF",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 6: 4NF and 5NF"
          ]
        }
      }
    ]
  },
  {
    "title": "WEEK 12",
    "objective": "Transactions — ACID properties, COMMIT, ROLLBACK, SAVEPOINT",
    "tutorial": "Tutorial 12: Transaction Management",
    "labTitle": "Lab 12: Transaction Control",
    "experiments": [
      {
        "id": "db-w12-1",
        "title": "ACID Properties Demonstration",
        "desc": "(a) Demonstrate Atomicity: a bank transfer transaction where a DEBIT succeeds but CREDIT fails — show ROLLBACK restores the original state, (b) Demonstrate Consistency: a CHECK constraint prevents a negative balance, (c) Discuss Isolation and Durability properties with examples.",
        "expected": "ROLLBACK correctly restores original state after partial failure; CHECK constraint enforces consistency; Isolation and Durability explained with concrete examples",
        "content": {
          "aim": {
            "text": "In this experiment, the student will demonstrate the four ACID properties of database transactions. The student will:",
            "bullets": [
              "Define and demonstrate Atomicity using a transaction that partially fails",
              "Define and demonstrate Consistency using integrity constraints",
              "Define Isolation and explain read phenomena (dirty read, non-repeatable read, phantom read)",
              "Define Durability and understand the role of the write-ahead log (WAL)",
              "Implement transactions using BEGIN TRANSACTION, COMMIT, and ROLLBACK in SQLite"
            ]
          },
          "theory": [
            {
              "title": "What is a Transaction?",
              "body": [
                "A transaction is a logical unit of work that comprises one or more database operations (INSERT, UPDATE, DELETE, SELECT).",
                "Transactions must be committed (made permanent) or rolled back (undone entirely) — they cannot be left partially applied.",
                "SQL transaction control: BEGIN TRANSACTION (or just BEGIN); COMMIT; ROLLBACK;",
                "SQLite is in auto-commit mode by default — each statement is its own transaction unless wrapped in BEGIN...COMMIT."
              ]
            },
            {
              "title": "Atomicity",
              "body": [
                "Atomicity: A transaction is treated as a single indivisible unit — either ALL operations succeed (commit) or NONE take effect (rollback).",
                "Example: Bank transfer — DEBIT account A and CREDIT account B. If CREDIT fails (e.g. account B does not exist), the entire transaction rolls back and A's balance is restored.",
                "Implemented by the DBMS using an undo log — before any change is applied, the old value is written to a log."
              ]
            },
            {
              "title": "Consistency",
              "body": [
                "Consistency: A transaction takes the database from one valid state to another valid state, preserving all defined integrity constraints.",
                "If a transaction would violate a constraint (CHECK, FOREIGN KEY, NOT NULL), the DBMS rejects it and rolls back.",
                "Example: A CHECK constraint (Balance >= 0) prevents a withdrawal that would create a negative balance."
              ]
            },
            {
              "title": "Isolation and Durability",
              "body": [
                "Isolation: Concurrent transactions execute as if they were serial — uncommitted changes of one transaction are not visible to others.",
                "Isolation levels (weakest to strongest): READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.",
                "Durability: Once a transaction is committed, its changes are permanent even if the system crashes immediately after.",
                "Implemented using a write-ahead log (WAL) — committed changes are written to durable storage before the commit returns to the application."
              ]
            }
          ],
          "pretest": [
            {
              "question": "Which ACID property ensures that a failed transaction does not partially change the database?",
              "options": [
                "Consistency",
                "Isolation",
                "Durability",
                "Atomicity"
              ],
              "answerIndex": 3
            },
            {
              "question": "Which ACID property is enforced by integrity constraints (CHECK, FK)?",
              "options": [
                "Atomicity",
                "Consistency",
                "Isolation",
                "Durability"
              ],
              "answerIndex": 1
            },
            {
              "question": "Durability means:",
              "options": [
                "Transactions run quickly",
                "Committed data survives system crashes",
                "Transactions are isolated from each other",
                "Constraints are always enforced"
              ],
              "answerIndex": 1
            },
            {
              "question": "In SQLite, what command starts a transaction explicitly?",
              "options": [
                "START TRANSACTION",
                "BEGIN TRANSACTION or BEGIN",
                "OPEN TRANSACTION",
                "INIT TRANSACTION"
              ],
              "answerIndex": 1
            },
            {
              "question": "ROLLBACK reverses:",
              "options": [
                "All committed transactions",
                "All uncommitted changes since the last BEGIN",
                "Only the last SQL statement",
                "The entire database"
              ],
              "answerIndex": 1
            }
          ],
          "procedure": [
            "Create a BANK_ACCOUNT table with Balance and a CHECK constraint (Balance >= 0)",
            "Insert two accounts and record initial balances",
            "Begin a transfer transaction: DEBIT account A by 500",
            "Simulate a failure before CREDIT (e.g. invalid account ID for account B)",
            "Execute ROLLBACK and verify that account A's balance is restored",
            "Now execute a complete successful transfer and COMMIT",
            "Attempt a withdrawal that would make balance negative — observe CHECK constraint rejection",
            "Discuss isolation by describing what another session would see before the COMMIT",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Setup\nCREATE TABLE BANK_ACCOUNT (\n    Acc_ID  INT PRIMARY KEY,\n    Name    VARCHAR(50),\n    Balance DECIMAL(10,2) CHECK (Balance >= 0)\n);\nINSERT INTO BANK_ACCOUNT VALUES (1001,'Alice',10000.00),(1002,'Bob',5000.00);\n\n-- (a) Atomicity Demo: Transfer 2000 from Alice to Bob\nBEGIN TRANSACTION;\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 2000 WHERE Acc_ID = 1001; -- DEBIT Alice\n    -- Simulated failure: next UPDATE would fail (wrong account ID)\n    UPDATE BANK_ACCOUNT SET Balance = Balance + 2000 WHERE Acc_ID = 9999; -- No such account\nROLLBACK;\n-- Verify: Alice's balance should still be 10000\nSELECT * FROM BANK_ACCOUNT;\n\n-- (b) Successful transfer with COMMIT\nBEGIN TRANSACTION;\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 2000 WHERE Acc_ID = 1001;\n    UPDATE BANK_ACCOUNT SET Balance = Balance + 2000 WHERE Acc_ID = 1002;\nCOMMIT;\nSELECT * FROM BANK_ACCOUNT;\n-- Alice: 8000, Bob: 7000\n\n-- (c) Consistency: attempt overdraft (violates CHECK Balance>=0)\nBEGIN TRANSACTION;\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 20000 WHERE Acc_ID = 1001;\n    -- Alice would go to -12000 → CHECK constraint fails\nROLLBACK;\nSELECT * FROM BANK_ACCOUNT;\n-- Alice remains 8000",
            "steps": [
              {
                "line": 1,
                "annotation": "BANK_ACCOUNT created with CHECK (Balance >= 0) to enforce consistency",
                "memory": [],
                "output": "Table created. Alice: 10000, Bob: 5000"
              },
              {
                "line": 2,
                "annotation": "BEGIN: DEBIT Alice by 2000 succeeds (balance=8000). CREDIT to Acc 9999 fails (no such row).",
                "memory": [],
                "output": "Alice balance temporarily 8000 in transaction scope"
              },
              {
                "line": 3,
                "annotation": "ROLLBACK: Alice's balance restored to 10000 due to atomicity",
                "memory": [],
                "output": "After ROLLBACK: Alice=10000, Bob=5000 — no change"
              },
              {
                "line": 4,
                "annotation": "Successful transfer: both DEBIT and CREDIT succeed; COMMIT makes changes permanent",
                "memory": [],
                "output": "After COMMIT: Alice=8000, Bob=7000"
              },
              {
                "line": 5,
                "annotation": "Overdraft attempt: Balance would become -12000 — CHECK constraint triggers; ROLLBACK",
                "memory": [],
                "output": "ERROR: CHECK constraint failed. After ROLLBACK: Alice=8000 unchanged"
              }
            ]
          },
          "posttest": [
            {
              "question": "After ROLLBACK in the failed transfer, Alice's balance is:",
              "options": [
                "8000 (DEBIT applied permanently)",
                "10000 (ROLLBACK restores original)",
                "0",
                "Error state"
              ],
              "answerIndex": 1
            },
            {
              "question": "Which ACID property prevents another transaction from seeing Alice's deducted balance before COMMIT?",
              "options": [
                "Atomicity",
                "Consistency",
                "Isolation",
                "Durability"
              ],
              "answerIndex": 2
            },
            {
              "question": "A database crash occurs 1 second after COMMIT. After recovery, the committed data:",
              "options": [
                "Is lost — commit was too recent",
                "Is preserved due to Durability (WAL)",
                "Must be re-entered manually",
                "Is rolled back automatically"
              ],
              "answerIndex": 1
            },
            {
              "question": "The CHECK (Balance >= 0) constraint enforces which ACID property?",
              "options": [
                "Atomicity",
                "Consistency",
                "Isolation",
                "Durability"
              ],
              "answerIndex": 1
            },
            {
              "question": "If a transaction has UPDATE A and UPDATE B, and UPDATE B fails, which outcome is correct?",
              "options": [
                "UPDATE A is committed, UPDATE B is retried",
                "Both updates are rolled back (Atomicity)",
                "UPDATE A remains; B is skipped",
                "The database is left in a partial state"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 14: Transactions (Sections 14.1-14.4 on ACID Properties)",
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 16: Transaction Management (Sections 16.1-16.2 on ACID)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 17: Introduction to Transaction Processing (ACID Properties)",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 17: Transactions — ACID",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 10: ACID Properties"
          ]
        }
      },
      {
        "id": "db-w12-2",
        "title": "COMMIT, ROLLBACK, and SAVEPOINT",
        "desc": "(a) Wrap a bank transfer (DEBIT source, CREDIT target) in a transaction with COMMIT, (b) Introduce an error mid-transaction and use ROLLBACK, (c) Use SAVEPOINT to partially rollback — undo some operations while committing others.",
        "expected": "Committed data persists after COMMIT; ROLLBACK restores pre-transaction state; ROLLBACK TO SAVEPOINT undoes only operations after the savepoint while preserving operations before it",
        "content": {
          "aim": {
            "text": "In this experiment, the student will implement transaction control using COMMIT, ROLLBACK, and SAVEPOINT commands. The student will:",
            "bullets": [
              "Wrap multiple DML statements in a single transaction using BEGIN and COMMIT",
              "Use ROLLBACK to undo an entire transaction when an error is detected",
              "Create intermediate checkpoints using SAVEPOINT",
              "Use ROLLBACK TO SAVEPOINT to undo operations after a savepoint without affecting operations before it",
              "Use RELEASE SAVEPOINT to remove a savepoint",
              "Understand practical use of savepoints in complex multi-step transactions"
            ]
          },
          "theory": [
            {
              "title": "COMMIT Statement",
              "body": [
                "COMMIT makes all changes made in the current transaction permanent in the database.",
                "After COMMIT, the changes are visible to other transactions and survive system crashes (Durability).",
                "Syntax: COMMIT; or COMMIT WORK;",
                "In auto-commit mode, each DML statement is automatically committed."
              ]
            },
            {
              "title": "ROLLBACK Statement",
              "body": [
                "ROLLBACK undoes ALL changes made since the last BEGIN (or last committed transaction).",
                "Syntax: ROLLBACK; or ROLLBACK WORK;",
                "Use when an error is detected mid-transaction and the entire operation must be abandoned.",
                "After ROLLBACK, the database returns to its state at the beginning of the transaction."
              ]
            },
            {
              "title": "SAVEPOINT",
              "body": [
                "SAVEPOINT name: Creates an intermediate checkpoint within a transaction.",
                "ROLLBACK TO SAVEPOINT name: Undoes all changes after the savepoint but keeps changes before it — the transaction remains open.",
                "RELEASE SAVEPOINT name: Removes the savepoint (does not commit or rollback).",
                "Use case: A multi-step order processing where each step (inventory check, payment, shipping) can be individually rolled back on failure without abandoning the whole transaction."
              ]
            },
            {
              "title": "Transaction States",
              "body": [
                "Active: Transaction is executing.",
                "Partially committed: Last statement executed successfully; awaiting COMMIT.",
                "Failed: An error occurred; awaiting ROLLBACK.",
                "Aborted: ROLLBACK executed; database restored to pre-transaction state.",
                "Committed: COMMIT executed; changes are permanent."
              ]
            }
          ],
          "pretest": [
            {
              "question": "SAVEPOINT SP1 creates:",
              "options": [
                "A new transaction",
                "A permanent checkpoint that commits changes so far",
                "An intermediate marker within a transaction",
                "A copy of the entire database"
              ],
              "answerIndex": 2
            },
            {
              "question": "ROLLBACK TO SAVEPOINT SP1 undoes:",
              "options": [
                "All changes since BEGIN",
                "All changes after SP1 was created; keeps changes before SP1",
                "Only the last statement",
                "All committed transactions"
              ],
              "answerIndex": 1
            },
            {
              "question": "After ROLLBACK TO SAVEPOINT SP1, the transaction:",
              "options": [
                "Is committed",
                "Is aborted",
                "Remains active — further statements can be executed",
                "Returns to auto-commit mode"
              ],
              "answerIndex": 2
            },
            {
              "question": "RELEASE SAVEPOINT SP1 does what?",
              "options": [
                "Commits changes up to SP1",
                "Rolls back to SP1",
                "Removes the SP1 marker without committing or rolling back",
                "Ends the transaction"
              ],
              "answerIndex": 2
            },
            {
              "question": "Which sequence correctly commits only the first INSERT and rolls back the second?",
              "options": [
                "INSERT1; INSERT2; ROLLBACK; COMMIT;",
                "BEGIN; INSERT1; SAVEPOINT SP1; INSERT2; ROLLBACK TO SP1; COMMIT;",
                "BEGIN; INSERT1; COMMIT; INSERT2; ROLLBACK;",
                "INSERT1; SAVEPOINT SP1; INSERT2; COMMIT;"
              ],
              "answerIndex": 1
            }
          ],
          "procedure": [
            "Ensure BANK_ACCOUNT table exists with Alice (Acc 1001, Balance 8000) and Bob (Acc 1002, Balance 7000)",
            "Run a complete transfer with COMMIT: DEBIT Alice 1000, CREDIT Bob 1000, COMMIT",
            "Verify balances: Alice=7000, Bob=8000",
            "Begin a new transaction with ROLLBACK: DEBIT Charlie, encounter error, ROLLBACK",
            "Verify balances unchanged after ROLLBACK",
            "Demonstrate SAVEPOINT: BEGIN; INSERT transaction record; SAVEPOINT SP1; UPDATE balance; error detected; ROLLBACK TO SP1; adjust and re-try; COMMIT",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Initial state: Alice=8000, Bob=7000\nSELECT * FROM BANK_ACCOUNT;\n\n-- (a) Successful transfer with COMMIT\nBEGIN TRANSACTION;\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 1000 WHERE Acc_ID = 1001; -- Debit Alice\n    UPDATE BANK_ACCOUNT SET Balance = Balance + 1000 WHERE Acc_ID = 1002; -- Credit Bob\nCOMMIT;\nSELECT * FROM BANK_ACCOUNT; -- Alice=7000, Bob=8000\n\n-- (b) Failed transaction with ROLLBACK\nBEGIN TRANSACTION;\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 500 WHERE Acc_ID = 1001; -- Alice=6500\n    -- Simulated error: invalid target account\n    -- Application detects error and issues ROLLBACK\nROLLBACK;\nSELECT * FROM BANK_ACCOUNT; -- Alice still 7000 (rollback restored)\n\n-- (c) SAVEPOINT demonstration\n-- Scenario: Process two transfers; first succeeds; second fails; rollback only second\nBEGIN TRANSACTION;\n    -- First transfer: Alice to Bob (1000)\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 1000 WHERE Acc_ID = 1001;\n    UPDATE BANK_ACCOUNT SET Balance = Balance + 1000 WHERE Acc_ID = 1002;\n    SAVEPOINT after_first_transfer;\n\n    -- Second transfer: Bob to Alice (500) — suppose an error is detected\n    UPDATE BANK_ACCOUNT SET Balance = Balance - 500 WHERE Acc_ID = 1002;\n    UPDATE BANK_ACCOUNT SET Balance = Balance + 500 WHERE Acc_ID = 1001;\n    -- Error detected: wrong amount entered\n    ROLLBACK TO SAVEPOINT after_first_transfer;\n    -- First transfer is preserved; second transfer is undone\n\nCOMMIT;\nSELECT * FROM BANK_ACCOUNT;\n-- Alice=6000, Bob=9000 (only first transfer committed)",
            "steps": [
              {
                "line": 1,
                "annotation": "Initial state: Alice=8000, Bob=7000",
                "memory": [],
                "output": "Alice: 8000.00, Bob: 7000.00"
              },
              {
                "line": 2,
                "annotation": "DEBIT Alice 1000 and CREDIT Bob 1000; COMMIT makes both permanent",
                "memory": [],
                "output": "After COMMIT: Alice=7000, Bob=8000"
              },
              {
                "line": 3,
                "annotation": "DEBIT Alice 500 inside transaction; error simulated; ROLLBACK restores Alice to 7000",
                "memory": [],
                "output": "After ROLLBACK: Alice=7000 (unchanged), Bob=8000 (unchanged)"
              },
              {
                "line": 4,
                "annotation": "SAVEPOINT created after first transfer. Second transfer executed but rolled back to savepoint.",
                "memory": [],
                "output": "After ROLLBACK TO SAVEPOINT: First transfer preserved (Alice-1000, Bob+1000); second transfer undone"
              },
              {
                "line": 5,
                "annotation": "COMMIT: only the first transfer (up to savepoint) is committed permanently",
                "memory": [],
                "output": "Final: Alice=6000, Bob=9000"
              }
            ]
          },
          "posttest": [
            {
              "question": "After ROLLBACK TO SAVEPOINT SP1, which changes are preserved?",
              "options": [
                "No changes — all are rolled back",
                "Changes made BEFORE SP1 was created",
                "Changes made AFTER SP1 was created",
                "Only the COMMIT is preserved"
              ],
              "answerIndex": 1
            },
            {
              "question": "Can more SQL statements be executed after ROLLBACK TO SAVEPOINT?",
              "options": [
                "No — the transaction ends",
                "Yes — the transaction remains open",
                "Only SELECT statements",
                "Only COMMIT is allowed"
              ],
              "answerIndex": 1
            },
            {
              "question": "RELEASE SAVEPOINT SP1 followed by ROLLBACK will:",
              "options": [
                "Rollback to SP1",
                "Rollback the entire transaction (SP1 is no longer available)",
                "Commit changes up to SP1",
                "Only rollback changes after SP1"
              ],
              "answerIndex": 1
            },
            {
              "question": "In a multi-step order processing system, SAVEPOINTs are used to:",
              "options": [
                "Speed up queries",
                "Allow partial rollback of failed steps without losing successful ones",
                "Permanently save intermediate states",
                "Replace COMMIT statements"
              ],
              "answerIndex": 1
            },
            {
              "question": "In auto-commit mode, each SQL statement:",
              "options": [
                "Requires an explicit COMMIT",
                "Is automatically wrapped in a transaction and committed",
                "Is never committed until COMMIT is issued",
                "Requires a SAVEPOINT"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 14: Transactions (Section 14.3 on Transaction Control)",
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 16: Transaction Management (Section 16.3 on COMMIT and ROLLBACK)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 17: COMMIT, ROLLBACK, and SAVEPOINT",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 17: Transaction Control Commands",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 10: SAVEPOINT and Transaction Control"
          ]
        }
      }
    ]
  },
  {
    "title": "WEEK 13",
    "objective": "Concurrency Control — Serializability, Lock-based and Timestamp-based protocols",
    "tutorial": "Tutorial 13: Concurrency Control",
    "labTitle": "Lab 13: Concurrency and Schedule Analysis",
    "experiments": [
      {
        "id": "db-w13-1",
        "title": "Testing Serializability — Precedence Graph",
        "desc": "Given a schedule of two transactions T1 and T2 with operations on data items X and Y: (a) Build the precedence (serialization) graph, (b) Check for cycles to determine if the schedule is conflict-serializable, (c) If serializable, identify the equivalent serial schedule.",
        "expected": "Precedence graph correctly drawn; cycle detection determines serializability; equivalent serial order identified if acyclic",
        "content": {
          "aim": {
            "text": "In this experiment, the student will analyze a concurrent schedule for conflict-serializability using a precedence graph. The student will:",
            "bullets": [
              "Define a schedule and identify conflicting operations between transactions",
              "Construct a precedence (serialization) graph for a given schedule",
              "Apply cycle detection to determine if the schedule is conflict-serializable",
              "Identify the equivalent serial schedule from the topological order of the acyclic graph",
              "Distinguish between conflict-serializable and view-serializable schedules"
            ]
          },
          "theory": [
            {
              "title": "Schedules and Conflict",
              "body": [
                "A schedule is an ordering of operations (reads/writes) from multiple concurrent transactions.",
                "Two operations conflict if: (1) they belong to different transactions, (2) they access the same data item, and (3) at least one is a write.",
                "Conflict types: Read-Write (R-W), Write-Read (W-R), Write-Write (W-W).",
                "Read-Read (R-R) operations never conflict — multiple transactions can read the same item simultaneously."
              ]
            },
            {
              "title": "Conflict Serializability",
              "body": [
                "A schedule S is conflict-serializable if it can be transformed into a serial schedule by swapping non-conflicting operations.",
                "Equivalent serial schedule: the result of executing each transaction completely before the next.",
                "Test: Build the precedence graph and check for cycles — if acyclic, the schedule is conflict-serializable."
              ]
            },
            {
              "title": "Precedence Graph Construction",
              "body": [
                "Nodes: One node per transaction (T1, T2, ..., Tn).",
                "Edges: Add edge Ti → Tj if an operation of Ti conflicts with a later operation of Tj.",
                "Specifically: (a) Ti writes X before Tj reads X (W-R conflict: edge Ti→Tj), (b) Ti reads X before Tj writes X (R-W conflict: edge Ti→Tj), (c) Ti writes X before Tj writes X (W-W conflict: edge Ti→Tj).",
                "If the graph has a cycle → NOT conflict-serializable. If acyclic → conflict-serializable; topological sort gives the equivalent serial order."
              ]
            },
            {
              "title": "View Serializability",
              "body": [
                "A schedule is view-serializable if it is view-equivalent to some serial schedule.",
                "View equivalence requires: same initial reads, same final writes, and same reads-from relationships.",
                "Every conflict-serializable schedule is view-serializable, but not vice versa.",
                "Testing view-serializability is NP-complete; testing conflict-serializability is polynomial (cycle detection)."
              ]
            }
          ],
          "pretest": [
            {
              "question": "Two operations conflict if they:",
              "options": [
                "Access the same table",
                "Belong to the same transaction and access the same item",
                "Belong to different transactions, access the same item, and at least one is a write",
                "Both are read operations"
              ],
              "answerIndex": 2
            },
            {
              "question": "An edge Ti → Tj in the precedence graph means:",
              "options": [
                "Ti must execute after Tj",
                "Ti has a conflicting operation that precedes a conflicting operation of Tj",
                "Ti and Tj access the same data item",
                "Ti writes after Tj writes"
              ],
              "answerIndex": 1
            },
            {
              "question": "A schedule is conflict-serializable if the precedence graph is:",
              "options": [
                "Cyclic",
                "Acyclic",
                "Complete (all nodes connected)",
                "Empty (no edges)"
              ],
              "answerIndex": 1
            },
            {
              "question": "R-R (Read-Read) operations between two transactions:",
              "options": [
                "Always conflict",
                "Never conflict",
                "Conflict only on primary key columns",
                "Conflict if one is a dirty read"
              ],
              "answerIndex": 1
            },
            {
              "question": "Topological sort of an acyclic precedence graph gives:",
              "options": [
                "The optimal schedule",
                "The equivalent serial schedule order",
                "All possible schedules",
                "The lock acquisition order"
              ],
              "answerIndex": 1
            }
          ],
          "procedure": [
            "Study the given schedule S with operations of T1 and T2 on data items X and Y",
            "List all pairs of operations and identify conflicting pairs",
            "Draw the precedence graph: add a node for T1 and T2",
            "For each conflicting pair, add the appropriate directed edge",
            "Check for cycles in the graph using DFS",
            "If acyclic: perform topological sort to identify the equivalent serial schedule",
            "Verify by executing both the original schedule and the serial schedule and confirming they produce the same final database state",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Schedule S analysis (non-SQL — conceptual trace)\n-- Schedule S:\n-- T1: R(X), R(Y), W(X)\n-- T2: R(X), W(X), W(Y)\n-- Interleaved order:\n-- Step 1: T1 R(X)\n-- Step 2: T2 R(X)\n-- Step 3: T1 R(Y)\n-- Step 4: T2 W(X)   ← T1 already read X at step 1\n-- Step 5: T1 W(X)   ← T2 already wrote X at step 4\n-- Step 6: T2 W(Y)   ← T1 has not written Y\n\n-- Conflict analysis:\n-- T2 W(X) at step 4 vs T1 R(X) at step 1: T1 reads X before T2 writes X → edge T1→T2 (R-W conflict)\n-- T1 W(X) at step 5 vs T2 W(X) at step 4: T2 writes X before T1 writes X → edge T2→T1 (W-W conflict)\n\n-- Precedence Graph:\n-- T1 →(R-W on X)→ T2\n-- T2 →(W-W on X)→ T1\n-- CYCLE DETECTED: T1→T2→T1 → Schedule is NOT conflict-serializable\n\n-- Example of a conflict-serializable schedule:\n-- T1: R(X), W(X)\n-- T2: R(X), W(X), W(Y)\n-- Interleaved (serial-equivalent):\n-- T1 R(X), T1 W(X), T2 R(X), T2 W(X), T2 W(Y)\n-- Conflict pairs: T1 W(X) before T2 R(X) → edge T1→T2. No other conflicts.\n-- Graph: T1→T2 (acyclic) → Equivalent serial: T1 then T2\n\n-- SQL simulation of serial vs concurrent execution\nCREATE TABLE DATA_ITEMS (Item_ID VARCHAR(5) PRIMARY KEY, Value INT);\nINSERT INTO DATA_ITEMS VALUES ('X', 100), ('Y', 200);\n\n-- T1 serial execution\nBEGIN;\nSELECT Value FROM DATA_ITEMS WHERE Item_ID='X'; -- T1 R(X)\nUPDATE DATA_ITEMS SET Value = Value + 10 WHERE Item_ID='X'; -- T1 W(X)\nCOMMIT;\n\n-- T2 serial execution (after T1)\nBEGIN;\nSELECT Value FROM DATA_ITEMS WHERE Item_ID='X'; -- T2 R(X) reads T1's committed value\nUPDATE DATA_ITEMS SET Value = Value * 2 WHERE Item_ID='X'; -- T2 W(X)\nUPDATE DATA_ITEMS SET Value = Value + 5 WHERE Item_ID='Y'; -- T2 W(Y)\nCOMMIT;\n\nSELECT * FROM DATA_ITEMS;",
            "steps": [
              {
                "line": 1,
                "annotation": "Schedule S step-by-step: T1 reads X, T2 reads X, T1 reads Y, T2 writes X, T1 writes X, T2 writes Y",
                "memory": [],
                "output": "Operations listed in schedule order"
              },
              {
                "line": 2,
                "annotation": "Conflict 1 (R-W): T1 R(X) at step 1, T2 W(X) at step 4 → edge T1→T2",
                "memory": [],
                "output": "Edge added: T1 → T2"
              },
              {
                "line": 3,
                "annotation": "Conflict 2 (W-W): T2 W(X) at step 4, T1 W(X) at step 5 → edge T2→T1",
                "memory": [],
                "output": "Edge added: T2 → T1. Cycle: T1→T2→T1 detected."
              },
              {
                "line": 4,
                "annotation": "CYCLE EXISTS → Schedule S is NOT conflict-serializable",
                "memory": [],
                "output": "Conclusion: Schedule is not conflict-serializable"
              },
              {
                "line": 5,
                "annotation": "Acyclic example: T1 completes all operations on X before T2 → single edge T1→T2, no cycle → serial equivalent: T1 then T2",
                "memory": [],
                "output": "Serial schedule: T1 then T2. X final = (100+10)*2 = 220, Y = 205"
              }
            ]
          },
          "posttest": [
            {
              "question": "The schedule T1:R(X), T2:W(X), T1:W(X) has what conflict and resulting edge?",
              "options": [
                "T2→T1 (W-W conflict on X)",
                "T1→T2 (R-W conflict on X) and T2→T1 (W-W conflict on X)",
                "T1→T2 only",
                "No conflict — R and W do not conflict"
              ],
              "answerIndex": 1
            },
            {
              "question": "A precedence graph with 3 transactions and edges T1→T2, T2→T3, T3→T1 is:",
              "options": [
                "Acyclic — serializable",
                "Cyclic — not serializable",
                "Acyclic if we remove one edge",
                "Always serializable regardless of cycles"
              ],
              "answerIndex": 1
            },
            {
              "question": "Topological sort of acyclic graph T1→T2→T3 gives serial order:",
              "options": [
                "T3, T2, T1",
                "T1, T2, T3",
                "T2, T1, T3",
                "Any order is valid"
              ],
              "answerIndex": 1
            },
            {
              "question": "Which pair of operations does NOT conflict?",
              "options": [
                "T1:W(X) and T2:W(X)",
                "T1:R(X) and T2:W(X)",
                "T1:R(X) and T2:R(X)",
                "T1:W(X) and T2:R(X)"
              ],
              "answerIndex": 2
            },
            {
              "question": "Every conflict-serializable schedule is view-serializable. The converse:",
              "options": [
                "Is also always true",
                "Is not always true — some view-serializable schedules are not conflict-serializable",
                "Is true only for 2 transactions",
                "Is true if no blind writes exist"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 15: Concurrency Control (Sections 15.1-15.4 on Serializability)",
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 17: Concurrency Control (Section 17.2 on Serializability)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 18: Serializability and Precedence Graphs",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 18: Serializability",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 10: Serializability Testing"
          ]
        }
      },
      {
        "id": "db-w13-2",
        "title": "Lock-based Protocol Simulation",
        "desc": "Simulate two-phase locking (2PL): (a) Show lock acquisition (shared/exclusive) and release following 2PL rules, (b) Detect a deadlock situation and show how it is resolved by aborting one transaction, (c) Compare strict 2PL with basic 2PL and explain cascading rollback.",
        "expected": "Lock table correctly shows shared/exclusive lock grants and waits; deadlock cycle detected; victim transaction aborted and restarted; strict 2PL shown to prevent cascading rollbacks",
        "content": {
          "aim": {
            "text": "In this experiment, the student will simulate the two-phase locking (2PL) protocol for concurrency control. The student will:",
            "bullets": [
              "Understand the difference between shared (S) and exclusive (X) locks",
              "Apply the 2PL protocol: growing phase (only acquire locks) and shrinking phase (only release locks)",
              "Simulate a lock table showing lock grants and waits",
              "Identify a deadlock from a wait-for graph and resolve it by aborting a victim transaction",
              "Distinguish strict 2PL from basic 2PL and explain why strict 2PL prevents cascading rollbacks"
            ]
          },
          "theory": [
            {
              "title": "Lock Types",
              "body": [
                "Shared Lock (S-lock / Read lock): Multiple transactions can hold an S-lock on the same data item simultaneously. Acquired before reading.",
                "Exclusive Lock (X-lock / Write lock): Only one transaction can hold an X-lock. No other lock (S or X) can be held by another transaction concurrently. Acquired before writing.",
                "Lock compatibility matrix: S-S → Compatible (both granted); S-X → Incompatible (X waits); X-S → Incompatible (X waits); X-X → Incompatible (new X waits)."
              ]
            },
            {
              "title": "Two-Phase Locking (2PL)",
              "body": [
                "Phase 1 — Growing Phase: A transaction may acquire locks but may NOT release any lock.",
                "Phase 2 — Shrinking Phase: A transaction may release locks but may NOT acquire any new lock.",
                "The point at which the first lock is released is called the lock point.",
                "2PL guarantees conflict-serializability: the serial order is determined by the lock points of transactions."
              ]
            },
            {
              "title": "Deadlock",
              "body": [
                "Deadlock occurs when two or more transactions each wait for the other to release a lock — forming a circular wait.",
                "Detection: Build a wait-for graph. If a cycle exists → deadlock.",
                "Resolution: Abort one transaction (the victim) — typically the youngest or the one that has done the least work. The victim's locks are released, allowing other transactions to proceed.",
                "Prevention: Use lock ordering (always lock items in a fixed order) or timeout-based detection."
              ]
            },
            {
              "title": "Strict 2PL vs Basic 2PL",
              "body": [
                "Basic 2PL: Exclusive locks can be released before the transaction commits — may cause cascading rollbacks if a subsequent transaction reads uncommitted data.",
                "Strict 2PL: All exclusive (X) locks are held until the transaction commits or aborts. Prevents dirty reads and cascading rollbacks.",
                "Rigorous 2PL: All locks (S and X) held until commit. Easiest to implement; most restrictive.",
                "Most commercial databases implement Strict 2PL (or a variant) for recoverability."
              ]
            }
          ],
          "pretest": [
            {
              "question": "A shared lock allows:",
              "options": [
                "Only one transaction to read",
                "Multiple transactions to read simultaneously",
                "One transaction to write and others to read",
                "No other transaction to access the item"
              ],
              "answerIndex": 1
            },
            {
              "question": "In 2PL, after a transaction releases its first lock, it can:",
              "options": [
                "Acquire more locks",
                "Release more locks only — no new locks allowed",
                "Acquire S-locks but not X-locks",
                "Acquire any lock with the manager's permission"
              ],
              "answerIndex": 1
            },
            {
              "question": "A deadlock is detected using:",
              "options": [
                "Precedence graph",
                "Wait-for graph — a cycle indicates deadlock",
                "Lock compatibility matrix",
                "Timestamp ordering"
              ],
              "answerIndex": 1
            },
            {
              "question": "Strict 2PL holds X-locks until:",
              "options": [
                "The lock point",
                "The first read after the write",
                "Transaction commit or abort",
                "The end of the growing phase"
              ],
              "answerIndex": 2
            },
            {
              "question": "Cascading rollback occurs in basic 2PL when:",
              "options": [
                "A deadlock is detected",
                "A transaction reads uncommitted data from another transaction that later aborts",
                "Two transactions write the same item",
                "The lock table is full"
              ],
              "answerIndex": 1
            }
          ],
          "procedure": [
            "Simulate T1 and T2 concurrently accessing data items X and Y",
            "Draw the lock table showing: transaction, item, lock type, status (granted/waiting)",
            "Follow 2PL rules: T1 acquires S(X), T2 acquires S(X), T1 requests X(X) — must wait (T2 holds S(X))",
            "T2 requests X(Y), T1 requests X(Y) — deadlock scenario: T1 waits for T2, T2 waits for T1",
            "Draw the wait-for graph and detect the cycle",
            "Choose a victim (e.g., T2) and abort it; release T2's locks",
            "T1 can now proceed; T2 is restarted",
            "Repeat simulation with strict 2PL: show that X-locks are held until COMMIT",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Lock-based protocol simulation (conceptual — no SQL lock syntax in SQLite)\n-- Transactions: T1 and T2 on data items X and Y\n\n-- Step 1: T1 acquires S(X) — granted (no conflicting lock)\n-- Lock Table: X → T1:S(granted)\n\n-- Step 2: T2 acquires S(X) — granted (S-S compatible)\n-- Lock Table: X → T1:S(granted), T2:S(granted)\n\n-- Step 3: T1 requests X(X) — WAIT (T2 holds S(X), X-S incompatible)\n-- Lock Table: X → T1:S(granted), T2:S(granted), T1:X(waiting)\n\n-- Step 4: T2 acquires S(Y) — granted (no lock on Y)\n-- Lock Table: X → (as above), Y → T2:S(granted)\n\n-- Step 5: T1 (still waiting for X-lock on X)\n-- T2 requests X(Y) — T2 is in growing phase; upgrades S(Y) to X(Y).\n-- If T1 also holds S(Y): DEADLOCK\n-- (Assume T1 acquired S(Y) earlier)\n\n-- DEADLOCK:\n-- T1 waits for T2 to release S(X) (to get X-lock on X)\n-- T2 waits for T1 to release S(Y) (to upgrade to X(Y))\n-- Wait-for graph: T1 → T2 → T1 (cycle = deadlock)\n\n-- Resolution: Abort T2 (victim)\n-- Release all T2's locks: S(X) released, S(Y) released\n-- T1 can now acquire X(X); proceed to completion\n-- T2 is restarted from the beginning\n\n-- SQL-level simulation using transactions in sequence\nCREATE TABLE LOCK_LOG (\n    Step INT, Transaction_ID VARCHAR(5),\n    Item VARCHAR(5), Lock_Type VARCHAR(5), Status VARCHAR(10)\n);\nINSERT INTO LOCK_LOG VALUES\n  (1,'T1','X','S','granted'),\n  (2,'T2','X','S','granted'),\n  (3,'T1','X','X','waiting'),\n  (4,'T2','Y','S','granted'),\n  (5,'T2','Y','X','waiting'),  -- T1 holds S(Y)\n  (6,'T1','Y','S','granted'),  -- T1 had acquired S(Y) earlier\n  -- Deadlock: T1 waits for T2's S(X); T2 waits for T1's S(Y)\n  (7,'T2','*','*','ABORTED'),  -- T2 is victim\n  (8,'T1','X','X','granted'),  -- T1 proceeds after T2 aborted\n  (9,'T1','*','*','COMMIT');\n\nSELECT * FROM LOCK_LOG ORDER BY Step;\n\n-- Wait-for graph edges:\n-- T1 → T2 (T1 waits for T2 to release S(X))\n-- T2 → T1 (T2 waits for T1 to release S(Y))\n-- Cycle detected → Deadlock → Abort T2",
            "steps": [
              {
                "line": 1,
                "annotation": "T1: S(X) granted. T2: S(X) granted. S-S compatible — no conflict.",
                "memory": [],
                "output": "Lock table: X locked by T1:S and T2:S (both granted)"
              },
              {
                "line": 2,
                "annotation": "T1 requests X(X) — blocked because T2 holds S(X). X-S incompatible.",
                "memory": [],
                "output": "T1 waiting for X-lock on X"
              },
              {
                "line": 3,
                "annotation": "T2 acquired S(Y); T1 had earlier acquired S(Y). T2 requests X(Y) — blocked by T1's S(Y).",
                "memory": [],
                "output": "T2 waiting for X-lock on Y"
              },
              {
                "line": 4,
                "annotation": "Wait-for graph: T1→T2 (waits for S(X) release), T2→T1 (waits for S(Y) release). Cycle = DEADLOCK.",
                "memory": [],
                "output": "Deadlock detected: T1↔T2 circular wait"
              },
              {
                "line": 5,
                "annotation": "T2 aborted (victim). All T2 locks released. T1 acquires X(X) and proceeds. T2 restarted.",
                "memory": [],
                "output": "T2 aborted and restarted. T1 completes and commits."
              }
            ]
          },
          "posttest": [
            {
              "question": "Which lock types are compatible (both can be granted simultaneously)?",
              "options": [
                "X and X",
                "S and X",
                "X and S",
                "S and S"
              ],
              "answerIndex": 3
            },
            {
              "question": "In 2PL, a transaction enters the shrinking phase when:",
              "options": [
                "It reads the first data item",
                "It releases its first lock",
                "It acquires its last lock",
                "It issues COMMIT"
              ],
              "answerIndex": 1
            },
            {
              "question": "A wait-for graph cycle T1→T2→T3→T1 indicates:",
              "options": [
                "A conflict-serializable schedule",
                "A deadlock involving T1, T2, T3",
                "A valid lock acquisition order",
                "An acyclic schedule"
              ],
              "answerIndex": 1
            },
            {
              "question": "Strict 2PL prevents cascading rollbacks because:",
              "options": [
                "It acquires fewer locks",
                "X-locks are held until commit so no other transaction can read uncommitted data",
                "It uses timestamps instead of locks",
                "Transactions cannot read during the shrinking phase"
              ],
              "answerIndex": 1
            },
            {
              "question": "The lock point in 2PL is defined as:",
              "options": [
                "The time of first lock acquisition",
                "The time of the last lock acquisition (end of growing phase)",
                "The time of first lock release",
                "The time of COMMIT"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 15: Concurrency Control (Sections 15.5-15.6 on Lock-based Protocols)",
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 17: Concurrency Control (Sections 17.3-17.4 on Locking and Deadlock)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 18: Lock-based Protocols and Deadlock Handling",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 18: Locking and Deadlock",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 10: Locking Protocols and Deadlock Resolution"
          ]
        }
      }
    ]
  },
  {
    "title": "WEEK 14",
    "objective": "Indexing — B+ Tree construction and operations, Hash-based Indexing",
    "tutorial": "Tutorial 14: Indexing Techniques",
    "labTitle": "Lab 14: Index Structures",
    "experiments": [
      {
        "id": "db-w14-1",
        "title": "B+ Tree Operations",
        "desc": "(a) Construct a B+ tree of order 3 by inserting keys: 10, 20, 5, 6, 12, 30, 7, 17; (b) Show the tree after each insertion with appropriate splits; (c) Perform search and deletion operations; (d) Create an index in SQL and observe query plan using EXPLAIN QUERY PLAN.",
        "expected": "Correctly balanced B+ tree after all insertions with proper splits; SQL index creation demonstrated; EXPLAIN QUERY PLAN output shows index usage",
        "content": {
          "aim": {
            "text": "In this experiment, the student will construct and operate a B+ tree index and create SQL indexes. The student will:",
            "bullets": [
              "Define B+ tree properties: order, leaf nodes, internal nodes, and the linked leaf list",
              "Insert keys into a B+ tree of order 3 and handle node splits correctly",
              "Perform point search (equality) on a B+ tree",
              "Perform deletion from a B+ tree and handle underflow with redistribution or merge",
              "Create a SQL index using CREATE INDEX and observe its effect on query plans using EXPLAIN QUERY PLAN",
              "Understand when an index is used vs when a full table scan is preferred"
            ]
          },
          "theory": [
            {
              "title": "B+ Tree Structure",
              "body": [
                "A B+ tree of order n (also called degree or max keys = n-1): each internal node has at most n pointers and n-1 keys; each leaf node has at most n-1 key-value pairs.",
                "Minimum fill: Internal nodes (except root) have at least ⌈n/2⌉ pointers. Leaves have at least ⌈(n-1)/2⌉ entries.",
                "All data records (or pointers to records) are stored in leaf nodes only — internal nodes are purely for routing.",
                "Leaf nodes are linked in a doubly-linked list for efficient range queries.",
                "Height is O(log_n N) where N is the number of records — extremely shallow for large n."
              ]
            },
            {
              "title": "B+ Tree Insertion",
              "body": [
                "Step 1: Find the correct leaf node using the search path from root.",
                "Step 2: Insert the key into the leaf. If the leaf has space (≤ n-1 keys), done.",
                "Step 3: If the leaf overflows (n keys): split the leaf into two. The middle key is copied up to the parent.",
                "Step 4: If the parent overflows: split the internal node. The middle key is pushed up (not copied).",
                "Step 5: If the root splits: create a new root with one key and two children — tree height increases by 1."
              ]
            },
            {
              "title": "B+ Tree Search",
              "body": [
                "Point query (equality): Traverse from root to the appropriate leaf following keys. O(log_n N) comparisons.",
                "Range query: Find the start of the range using a point search, then traverse the linked leaf list until the upper bound is exceeded.",
                "B+ trees are ideal for both equality and range queries — unlike hash indexes."
              ]
            },
            {
              "title": "SQL Indexing",
              "body": [
                "CREATE INDEX idx_name ON table_name(column_name); — creates a B+ tree index by default in most databases.",
                "CREATE UNIQUE INDEX idx_name ON table_name(column); — enforces uniqueness.",
                "DROP INDEX idx_name; — removes the index.",
                "EXPLAIN QUERY PLAN SELECT ... — shows the query optimizer's chosen execution plan, indicating whether an index is used.",
                "SQLite uses indexes automatically when the optimizer estimates it is faster than a full table scan."
              ]
            }
          ],
          "pretest": [
            {
              "question": "In a B+ tree, data records are stored only in:",
              "options": [
                "Internal nodes",
                "Root node",
                "Leaf nodes",
                "All nodes equally"
              ],
              "answerIndex": 2
            },
            {
              "question": "A B+ tree of order 3 allows at most how many keys per internal node?",
              "options": [
                "3",
                "2",
                "4",
                "1"
              ],
              "answerIndex": 1
            },
            {
              "question": "When a leaf node overflows in a B+ tree, the middle key is:",
              "options": [
                "Pushed up and deleted from the leaf",
                "Copied up to the parent, remaining in the leaf",
                "Deleted from the tree",
                "Moved to the right sibling"
              ],
              "answerIndex": 1
            },
            {
              "question": "Leaf nodes in a B+ tree are linked as a:",
              "options": [
                "Binary tree",
                "Linked list for efficient range queries",
                "Hash table",
                "Stack"
              ],
              "answerIndex": 1
            },
            {
              "question": "CREATE INDEX on a column speeds up:",
              "options": [
                "Only INSERT operations",
                "Only UPDATE operations",
                "SELECT queries with WHERE conditions on that column",
                "All DML operations equally"
              ],
              "answerIndex": 2
            }
          ],
          "procedure": [
            "Study the B+ tree rules: order 3 means max 2 keys per node, min 1 key per non-root node",
            "Insert keys one by one: 10, 20, 5, 6, 12, 30, 7, 17",
            "After each insertion, draw the tree and show any splits that occur",
            "Perform a search for key 12 and trace the path from root to leaf",
            "Perform deletion of key 5 and handle any underflow",
            "Create a SQL index: CREATE INDEX idx_roll ON STUDENT(Roll_No)",
            "Run EXPLAIN QUERY PLAN SELECT * FROM STUDENT WHERE Roll_No = 103",
            "Create a composite index and test a range query",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- B+ Tree Insertions (order 3: max 2 keys per node)\n-- Insertions: 10, 20, 5, 6, 12, 30, 7, 17\n\n-- Insert 10: Leaf [10] — root is also a leaf\n-- Insert 20: Leaf [10, 20]\n-- Insert 5:  Leaf [5, 10, 20] → OVERFLOW (max 2 keys)\n--   Split: Left leaf [5], Right leaf [10, 20]\n--   Copy middle key (10) to parent/root\n--   Root: [10], Children: [5] | [10, 20]\n-- Insert 6:  6 < 10 → go left: [5, 6]\n-- Insert 12: 12 >= 10 → go right: [10, 12, 20] → OVERFLOW\n--   Split right leaf: [10, 12] | [20]\n--   Copy middle key (12) up to root: Root [10, 12]\n-- Insert 30: 30 >= 12 → rightmost child: [20, 30]\n-- Insert 7:  7 < 10 → left: [5, 6, 7] → OVERFLOW\n--   Split: [5, 6] | [7]\n--   Copy middle key (6) to root: Root [6, 10, 12] → OVERFLOW\n--   Split root: new root [10], left child [6], right child [12]\n--   Left subtree under [6]: leaves [5],[6,7]\n--   Right subtree under [12]: leaves [10,12],[20,30]\n-- Insert 17: 17 >= 10, 17 >= 12 → goes to [20,30]: 17 < 20 → [10,12] leaf? Search properly\n--   17 >= 10, 17 < 20 → leaf [10,12]: [10, 12, 17] → OVERFLOW\n--   Split: [10,12] | [17], copy 17 up to parent [12] → parent becomes [12,17]\n\n-- Final B+ Tree (order 3, 8 keys inserted):\n-- Root: [10]\n-- Level 1: [6] | [12, 17]\n-- Leaves: [5] | [6,7] | [10] | [12] | [17] | [20,30]\n-- Leaf chain: 5 → 6,7 → 10 → 12 → 17 → 20,30\n\n-- SQL Index demonstration\nCREATE INDEX idx_student_roll ON STUDENT(Roll_No);\nCREATE INDEX idx_student_dept ON STUDENT(Dept_Name);\nCREATE INDEX idx_marks_course ON MARKS(Course_ID);\n\n-- EXPLAIN QUERY PLAN to see if index is used\nEXPLAIN QUERY PLAN\nSELECT * FROM STUDENT WHERE Roll_No = 103;\n-- Expected: SEARCH TABLE STUDENT USING INDEX idx_student_roll (Roll_No=?)\n\nEXPLAIN QUERY PLAN\nSELECT * FROM STUDENT WHERE Dept_Name = 'CSE';\n-- May use idx_student_dept or full table scan depending on cardinality\n\n-- Range query (B+ tree advantage)\nEXPLAIN QUERY PLAN\nSELECT * FROM STUDENT WHERE Roll_No BETWEEN 101 AND 103;\n-- B+ tree traverses leaf linked list for range\n\n-- Drop an index\nDROP INDEX idx_student_dept;\n\n-- Composite index\nCREATE INDEX idx_marks_roll_course ON MARKS(Roll_No, Course_ID);\nEXPLAIN QUERY PLAN\nSELECT * FROM MARKS WHERE Roll_No = 101 AND Course_ID = 'CS101';",
            "steps": [
              {
                "line": 1,
                "annotation": "Insertions 10, 20, 5 cause first split: root becomes [10] with leaves [5] and [10,20]",
                "memory": [],
                "output": "After 3 insertions: Root=[10], Leaves: [5] | [10,20]"
              },
              {
                "line": 2,
                "annotation": "Insert 6 → left leaf; Insert 12 → right leaf causes second split; Root becomes [10,12]",
                "memory": [],
                "output": "After 5 insertions: Root=[10,12], Leaves: [5,6] | [10,12] | [20]"
              },
              {
                "line": 3,
                "annotation": "Insert 30 → rightmost leaf. Insert 7 → left leaf overflow → root overflow → new root created",
                "memory": [],
                "output": "After 7 insertions: Root=[10], Level1=[6]|[12], Leaves: [5]|[6,7]|[10]|[12]|[20,30]"
              },
              {
                "line": 4,
                "annotation": "Insert 17 → leaf [10,12] overflow → split → parent [12] becomes [12,17]",
                "memory": [],
                "output": "Final tree: Root=[10], Level1=[6]|[12,17], Leaves: [5]|[6,7]|[10]|[12]|[17]|[20,30]"
              },
              {
                "line": 5,
                "annotation": "SQL index created; EXPLAIN QUERY PLAN confirms index usage for point and range queries",
                "memory": [],
                "output": "SEARCH TABLE STUDENT USING INDEX idx_student_roll (Roll_No=?)"
              }
            ]
          },
          "posttest": [
            {
              "question": "In a B+ tree of order 3, a leaf node can hold at most how many key-value pairs?",
              "options": [
                "3",
                "2",
                "1",
                "4"
              ],
              "answerIndex": 1
            },
            {
              "question": "When a leaf splits in a B+ tree, the middle key is:",
              "options": [
                "Pushed up and removed from the leaf (like internal node split)",
                "Copied up to the parent but remains in the right leaf",
                "Deleted from the tree entirely",
                "Moved to the left sibling"
              ],
              "answerIndex": 1
            },
            {
              "question": "Which query type benefits MORE from a B+ tree index compared to a hash index?",
              "options": [
                "Equality query (WHERE col = val)",
                "Range query (WHERE col BETWEEN x AND y)",
                "Aggregate query (COUNT(*))",
                "JOIN query without a WHERE clause"
              ],
              "answerIndex": 1
            },
            {
              "question": "EXPLAIN QUERY PLAN in SQLite shows 'SCAN TABLE STUDENT' instead of using an index when:",
              "options": [
                "The index is corrupted",
                "The optimizer estimates a full table scan is cheaper (e.g. most rows match the condition)",
                "The index was just created",
                "SQLite never uses indexes"
              ],
              "answerIndex": 1
            },
            {
              "question": "The height of a B+ tree grows when:",
              "options": [
                "Any leaf splits",
                "The root splits and a new root is created",
                "An internal node splits",
                "A key is deleted"
              ],
              "answerIndex": 1
            }
          ],
          references: [
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 10: Tree-Structured Indexing (Sections 10.1-10.7 on B+ Trees)",
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 11: Indexing and Hashing (Section 11.3 on B+ Trees)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 14: Indexing — B+ Trees",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 15: B+ Tree Indexing",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 11: B+ Tree Indexing"
          ]
        }
      },
      {
        "id": "db-w14-2",
        "title": "Hash-based Indexing",
        "desc": "(a) Implement a static hash index with 5 buckets and hash function h(k) = k MOD 5; (b) Insert keys and handle overflow with chaining; (c) Compare search cost of hash index vs sequential scan; (d) Compare hash index with B+ tree index for point queries vs range queries.",
        "expected": "Hash table with correct bucket assignments and overflow chains demonstrated; O(1) point query cost vs O(n) scan explained; hash index shown unsuitable for range queries",
        "content": {
          "aim": {
            "text": "In this experiment, the student will implement and analyze a static hash-based index. The student will:",
            "bullets": [
              "Define the hash function and compute bucket assignments for given keys",
              "Insert keys into a static hash table with 5 buckets",
              "Handle bucket overflow using chaining (linked overflow buckets)",
              "Compute the search cost of a hash index for point queries",
              "Explain why hash indexes are unsuitable for range queries",
              "Compare hash index vs B+ tree index for different query types"
            ]
          },
          "theory": [
            {
              "title": "Hash Indexing Overview",
              "body": [
                "A hash index maps a search key to a bucket number using a hash function.",
                "Static hashing: Fixed number of buckets B. Hash function: h(key) = key MOD B.",
                "Each bucket holds a fixed number of records. When a bucket is full, an overflow page is chained.",
                "Ideal for point queries (equality conditions): locate the bucket in O(1), then scan it.",
                "Weakness: Cannot efficiently handle range queries — keys in a range are distributed across all buckets unpredictably."
              ]
            },
            {
              "title": "Hash Function and Bucket Assignment",
              "body": [
                "For integer keys and B=5 buckets: h(k) = k MOD 5.",
                "h(10)=0, h(15)=0, h(6)=1, h(11)=1, h(7)=2, h(12)=2, h(8)=3, h(20)=0, h(25)=0.",
                "Collision: Multiple keys map to the same bucket. Handle with chaining (overflow pages).",
                "Load factor α = n/B where n = number of records. α > 1 forces overflow chains."
              ]
            },
            {
              "title": "Overflow Handling — Chaining",
              "body": [
                "When a primary bucket is full, an overflow bucket is allocated and linked to it.",
                "Search: Compute h(key), go to bucket, scan it and all its overflow pages.",
                "Worst case: All keys hash to the same bucket → search becomes O(n).",
                "Dynamic hashing (Extendible Hashing, Linear Hashing) avoids overflow by doubling the bucket count when load is high."
              ]
            },
            {
              "title": "Hash Index vs B+ Tree Index",
              "body": [
                "Point query performance: Hash index O(1) (average) vs B+ tree O(log_n N). Hash wins.",
                "Range query performance: Hash index O(n) (must scan all buckets) vs B+ tree O(log_n N + K) where K is result size. B+ tree wins decisively.",
                "Insert/Delete: Hash index O(1) average vs B+ tree O(log_n N). Hash wins.",
                "Practical databases (PostgreSQL, MySQL) offer both B+ tree indexes (default) and hash indexes (for equality-only workloads)."
              ]
            }
          ],
          "pretest": [
            {
              "question": "For a static hash index with 5 buckets, h(k) = k MOD 5. Which bucket does key 23 go to?",
              "options": [
                "0",
                "1",
                "2",
                "3"
              ],
              "answerIndex": 3
            },
            {
              "question": "Overflow in a static hash index is handled by:",
              "options": [
                "Increasing the hash function",
                "Chaining additional overflow buckets",
                "Rehashing all keys",
                "Deleting old records"
              ],
              "answerIndex": 1
            },
            {
              "question": "Hash indexes are unsuitable for range queries because:",
              "options": [
                "Hash indexes are slower than B+ trees always",
                "Consecutive keys do not land in consecutive buckets — range must scan all buckets",
                "Hash indexes do not support integer keys",
                "Hash functions always produce collisions for range queries"
              ],
              "answerIndex": 1
            },
            {
              "question": "Average search cost for a point query in a hash index (no overflow) is:",
              "options": [
                "O(n)",
                "O(log n)",
                "O(1)",
                "O(n log n)"
              ],
              "answerIndex": 2
            },
            {
              "question": "The load factor α of a hash index is defined as:",
              "options": [
                "Number of buckets / Number of records",
                "Number of records / Number of buckets",
                "Number of collisions / Number of records",
                "Bucket size / Key size"
              ],
              "answerIndex": 1
            }
          ],
          "procedure": [
            "Define hash function h(k) = k MOD 5 and create 5 buckets (0 to 4)",
            "Insert keys: 10, 20, 5, 6, 12, 30, 7, 17, 15, 25 using the hash function",
            "For each key, compute the bucket and record if overflow occurs",
            "Draw the bucket array with primary buckets and overflow chains",
            "Perform a point query: search for key 12 — trace the process",
            "Perform a range query: keys between 10 and 20 — show why this is inefficient",
            "Create a hash index equivalent scenario in SQL using indexed lookup",
            "Use EXPLAIN QUERY PLAN to compare index vs no-index query plans",
            "Proceed to Posttest"
          ],
          "simulation": {
            "code": "-- Static Hash Index: B=5 buckets, h(k) = k MOD 5\n-- Each bucket holds max 2 records (for demonstration)\n\n-- Key insertions: 10, 20, 5, 6, 12, 30, 7, 17, 15, 25\n-- h(10)=0, h(20)=0, h(5)=0 → Bucket 0 overflow!\n-- h(6)=1, h(12)=2, h(30)=0 → Bucket 0 overflow chain\n-- h(7)=2, h(17)=2 → Bucket 2 overflow!\n-- h(15)=0 → Bucket 0 overflow chain\n-- h(25)=0 → Bucket 0 overflow chain\n\n-- Bucket structure after all insertions:\n-- Bucket 0 (h=0): [10, 20] → overflow: [5, 30] → overflow: [15, 25]\n-- Bucket 1 (h=1): [6]\n-- Bucket 2 (h=2): [12, 7] → overflow: [17]\n-- Bucket 3 (h=3): []\n-- Bucket 4 (h=4): []\n\n-- SQL representation of hash index concept\nCREATE TABLE HASH_INDEX_DEMO (\n    Bucket_ID INT,\n    Key_Value INT,\n    Is_Overflow INT DEFAULT 0\n);\nINSERT INTO HASH_INDEX_DEMO VALUES\n  (0,10,0),(0,20,0),\n  (0,5,1),(0,30,1),\n  (0,15,1),(0,25,1),\n  (1,6,0),\n  (2,12,0),(2,7,0),\n  (2,17,1);\n\n-- Point query: find key 12\n-- h(12) = 12 MOD 5 = 2 → scan Bucket 2\nSELECT * FROM HASH_INDEX_DEMO WHERE Bucket_ID = 2 AND Key_Value = 12;\n-- Cost: scan only Bucket 2 (2 primary + 1 overflow = 3 records max)\n\n-- Range query: keys BETWEEN 10 AND 20 (hash is inefficient here)\n-- Must scan ALL buckets: h(10)=0, h(11)=1, h(12)=2, h(13)=3, h(14)=4, h(15)=0, h(16)=1, h(17)=2, h(18)=3, h(19)=4, h(20)=0\n-- Cannot skip any bucket → full scan needed\nSELECT Key_Value FROM HASH_INDEX_DEMO\nWHERE Key_Value BETWEEN 10 AND 20\nORDER BY Key_Value;\n-- Result: 10, 12, 15, 17, 20 — but required scanning all buckets\n\n-- SQL index creation\nCREATE TABLE STUDENT_INDEXED AS SELECT * FROM STUDENT;\nCREATE INDEX idx_hash_sim ON STUDENT_INDEXED(Roll_No);\n-- SQLite creates B+ tree; hash index simulation conceptual above\n\nEXPLAIN QUERY PLAN SELECT * FROM STUDENT_INDEXED WHERE Roll_No = 103;\n-- SEARCH using INDEX (B+tree in SQLite)\n\n-- Load factor calculation\nSELECT\n    5 AS Total_Buckets,\n    COUNT(*) AS Total_Keys,\n    ROUND(CAST(COUNT(*) AS REAL) / 5, 2) AS Load_Factor\nFROM HASH_INDEX_DEMO;",
            "steps": [
              {
                "line": 1,
                "annotation": "Hash function h(k)=k MOD 5 assigns each key to a bucket: key 10→0, 6→1, 12→2",
                "memory": [],
                "output": "Bucket 0: keys 10,20,5,30,15,25 (4 overflow). Bucket 1: [6]. Bucket 2: [12,7,17]. Buckets 3,4: empty."
              },
              {
                "line": 2,
                "annotation": "Point query for key 12: compute h(12)=2, go directly to Bucket 2, scan 3 records",
                "memory": [],
                "output": "Found: key 12 in Bucket 2 primary. Steps: 1 hash computation + 2 comparisons."
              },
              {
                "line": 3,
                "annotation": "Range query BETWEEN 10 AND 20: must check all 5 buckets (cannot skip any bucket)",
                "memory": [],
                "output": "10,12,15,17,20 found. Required scanning all buckets — O(B + overflow) cost."
              },
              {
                "line": 4,
                "annotation": "Load factor = 10 keys / 5 buckets = 2.0 (overloaded — overflow chains formed)",
                "memory": [],
                "output": "Load factor: 2.00. High load factor → more overflow → slower queries."
              },
              {
                "line": 5,
                "annotation": "B+ tree index for same data: range query traverses leaf linked list from 10 to 20 efficiently",
                "memory": [],
                "output": "B+ tree range: O(log n + K) vs Hash range: O(n). B+ tree wins for range queries."
              }
            ]
          },
          "posttest": [
            {
              "question": "Where does key 18 land in a 5-bucket hash table with h(k) = k MOD 5?",
              "options": [
                "Bucket 0",
                "Bucket 1",
                "Bucket 2",
                "Bucket 3"
              ],
              "answerIndex": 3
            },
            {
              "question": "What is the load factor when 15 records are stored in 5 buckets?",
              "options": [
                "5",
                "3",
                "0.33",
                "75"
              ],
              "answerIndex": 1
            },
            {
              "question": "For a range query WHERE salary BETWEEN 50000 AND 80000, which index is more efficient?",
              "options": [
                "Hash index — O(1) lookup",
                "B+ tree index — range traversal via linked leaves",
                "Both are equally efficient for range queries",
                "Neither — full scan is always used for range queries"
              ],
              "answerIndex": 1
            },
            {
              "question": "Chaining in a hash index refers to:",
              "options": [
                "Linking leaf nodes in a B+ tree",
                "Linking overflow buckets to a primary bucket when it is full",
                "Linking hash tables together",
                "Chaining hash functions"
              ],
              "answerIndex": 1
            },
            {
              "question": "In SQLite, CREATE INDEX creates which type of index by default?",
              "options": [
                "Hash index",
                "Bitmap index",
                "B+ tree index",
                "Clustered heap index"
              ],
              "answerIndex": 2
            }
          ],
          references: [
            "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 11: Hash-Based Indexing (Sections 11.1-11.5)",
            "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 11: Indexing and Hashing (Section 11.7-11.8 on Hash Indexing)",
            "Elmasri, R. and Navathe, S.B. - 'Database Management System', 6th Edition, Pearson, Chapter 14: Hash-based Indexing and Dynamic Hashing",
            "Date, C.J. - 'An Introduction to Database Systems', 8th Edition, Pearson, Chapter 15: Hash Indexing",
            "Coronel, C., Morris, S. and Robb, P. - 'Database Principles', Cengage Learning, Chapter 11: Static and Dynamic Hashing"
          ]
        }
      }
    ]
  }
  ]
};