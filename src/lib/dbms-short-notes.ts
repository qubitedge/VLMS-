export const dbmsShortNotes = `DATABASE MANAGEMENT SYSTEMS - SHORT NOTES
(As per JNTUGV / CEV R23 Syllabus)

INTRODUCTION TO DBMS

A Database Management System (DBMS) is software that enables users to define, create, maintain, and control access to databases. It acts as an intermediary between users and the database, ensuring data is consistently organized and remains easily accessible.

Why DBMS over File System?
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide">Traditional File System Issues</th><th class="p-3 border border-cyan/20 tracking-wide">DBMS Advantages</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Data Redundancy (Duplicate copies of the same data occupying unnecessary storage)</td><td class="p-3 border border-cyan/20">Centralized storage ensures data is stored in one place, minimizing redundancy.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Data Inconsistency (Different versions of the same data showing conflicting information)</td><td class="p-3 border border-cyan/20">Any update propagates instantly across the system, avoiding conflicting states.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Difficult Data Access (Writing custom backend programs just to fetch simple search criteria)</td><td class="p-3 border border-cyan/20">Provides robust query languages (like SQL) for fast, structured data retrieval.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Data Isolation (Data scattered across multiple formatted files, making updates tough)</td><td class="p-3 border border-cyan/20">Maintains unified schemas where data relationships are structured and interconnected.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">No Concurrent Access Control (Multiple users editing the same file concurrently creates corrupt data)</td><td class="p-3 border border-cyan/20">Employs locking mechanisms and concurrency control to handle multiple interactions safely.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Security Issues & Lack of Authorization (Difficult to restrict specific columns/tables from explicit user access)</td><td class="p-3 border border-cyan/20">Enforces strict user permissions, encryption, and roles-based database credentials.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">No Integrity Constraints (Invalid data formats can easily be written to storage directly)</td><td class="p-3 border border-cyan/20">Enforces strict schema rules (e.g., Data types, Foreign Keys, NOT NULL constraints).</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Atomicity & Recovery Problems (A system crash halfway through an operation leaves data half-baked)</td><td class="p-3 border border-cyan/20">Guarantees ACID properties with robust logging schemes for quick backup and recovery.</td></tr></tbody></table>

Database Users:
- Naive Users: Interact via pre-written applications (ATM, railway reservation)
- Application Programmers: Write application programs in languages like Java/Python with SQL
- Sophisticated Users: Write complex queries directly (analysts, scientists)
- Database Administrator (DBA): Manages schema, security, backups, performance tuning

Data Models:
- Hierarchical Model: Tree-like structure (parent-child), used in old systems (IMS)
- Network Model: Graph structure, allows multiple parents (CODASYL)
- Relational Model: Data organized in tables (rows and columns) — most widely used
- Object-Oriented Model: Data stored as objects, supports inheritance
- NoSQL Models: Document (MongoDB), Key-Value (Redis), Column-Family (Cassandra)

Schema and Instance
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Feature</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Database Schema</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Database Instance</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">Definition</td><td class="p-3 border border-cyan/20">The structural layout and definition of the database.</td><td class="p-3 border border-cyan/20">The actual data snapshot stored at a particular timestamp.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">Frequency of Change</td><td class="p-3 border border-cyan/20">Static; changes very rarely (requires careful planning).</td><td class="p-3 border border-cyan/20">Highly dynamic; changes frequently with every DML operation.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">Content</td><td class="p-3 border border-cyan/20">Contains table structures, attributes, data types, and constraints.</td><td class="p-3 border border-cyan/20">Contains the actual records, tuples, and values.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">Equivalence</td><td class="p-3 border border-cyan/20">Corresponds to a variable declaration or type in programming.</td><td class="p-3 border border-cyan/20">Corresponds to the value assigned to a variable at runtime.</td></tr></tbody></table>


Three-Tier Schema Architecture and Data Independence:
The primary goal of the Three-Tier Schema Architecture (also known as the ANSI-SPARC Architecture) is to separate the user applications from the physical database. By hiding the internal implementation details from the end-users, the system achieves a fundamental DBMS property known as Data Independence.
External Level (View Level):
Represents the highest level of data abstraction.
It defines how individual users or application programs interact with and see the data. 
Instead of showing the entire database layout, the external level provides multiple customized views (External Schemas) tailored to specific user roles. For example, a student view in a university portal displays attendance and marks, whereas an accounts department view displays fee transaction statuses.

Conceptual Level (Logical Level):
Acts as the structural intermediary between the external views and the physical storage.
It describes what data is actually stored in the database and details the relationships, entities, data types, and integrity constraints among them (Conceptual Schema).
This level represents a global, unified view of the entire database structure from a programmer or Database Administrator (DBA) perspective, completely free of hardware details.

Internal Level (Physical Level):
Represents the lowest level of data abstraction.
It describes how the data is actually stored on physical storage devices, hard disks, or servers (Internal Schema).
It deals with complex low-level implementation details such as data compression algorithms, encryption keys, storage allocations, record formats, and indexing pathways (like B-Trees or Hashing) used for fast data retrieval.

Data Independence:

The major objective of isolating these three levels is to provide Data Independence, which is defined as the ability to modify the schema definition at one level of the architecture without forcing a rewrite of the schema definitions at the higher levels. 
In a traditional file system, data structures are hard-coded into the application logic, meaning any change to the storage format breaks the app. The Three-Tier Architecture resolves this liability by dividing data independence into two structural layers

Logical Data Independence:
It is the capacity to change the Conceptual Schema without changing the External Schemas or application programs.
If the conceptual layout is altered—such as adding a new attribute to a course table, modifying an existing relationship, or breaking a table into two smaller tables (normalization)—the higher-end application code does not need to be refactored.
The Database Administrator simply updates the mapping between the External and Conceptual levels, keeping the application views completely unaffected.

Physical Data Independence:
It is the capacity to change the Internal Schema without changing the Conceptual Schema (and consequently, keeping the application programs untouched).
If the physical storage mechanisms are altered—such as migrating databases from an old HDD system to modern NVMe SSDs, changing the file-organization type, or switching indexing techniques from B+ Trees to Linear Hashing to optimize performance—the conceptual structure remains intact.
The database users and application interfaces continue to interact with the logical table entities unaware of the underlying physical storage upgrades. Because of this, Physical Data Independence is significantly easier to achieve than Logical Data Independence.
![Three Schema Architecture Diagram](/3-Tier-Schema-Architecture.jpg)

Database System Structure & Architecture:
- Centralized Architecture: All components on a single machine (traditional mainframe)
- Client-Server Architecture: Clients send requests, Database Server processes them
  - Two-Tier: Client connects directly to DB server (ODBC/JDBC)
  - Three-Tier: Client → Application Server → Database Server (web applications)


UNIT I — ENTITY RELATIONSHIP MODEL

ER Model Introduction:
ER Model is a high-level conceptual data model used to design databases. It represents real-world entities and relationships visually using ER Diagrams.

Components of ER Diagram:
![Basic Components of ER Diagram](/Basic_Components_ER.png)
1. ENTITIES:
   - Real-world object distinguishable from others (Person, Product, Course)
   - Represented by Rectangle
   - Types: 
     - Strong Entity (exists independently) 
     - Weak Entity (depends on another entity)

2. ATTRIBUTES:
   - Properties that describe an entity
   - Represented by Ovals (ellipses)
   - Types:
     - Simple vs Composite (e.g., Address = City+Street+Pin)
     - Single-valued vs Multi-valued (e.g., Phone Numbers) — double oval
     - Stored vs Derived (e.g., Age derived from DOB) — dashed oval
     - Key Attribute (uniquely identifies entity) — underlined

3. RELATIONSHIPS:
   - Association between entities (Works_In, Enrolls_In)
   - Represented by Diamond
   - Degree: Unary (same entity type), Binary (two types), Ternary (three types)
![Symbols representing components of ER](/Symbols_ER.png)

Relationship Constraints (Cardinality Ratios):
- One-to-One (1:1): One entity A related to at most one entity B
- One-to-Many (1:N): One entity A related to many entities B
- Many-to-One (N:1): Many entities A related to one entity B
- Many-to-Many (M:N): Many entities A related to many entities B

Participation Constraints:
- Total Participation: Every entity in set must participate (double line)
- Partial Participation: Entities may optionally participate (single line)

Subclasses, Superclass, Inheritance:
- Superclass: Higher-level entity (general) — e.g., Person
- Subclass: Specialized entity (specific) — e.g., Student, Faculty
- Inheritance: Subclass inherits all attributes and relationships of superclass
- Specialization: Process of defining subclasses from a superclass (top-down)
- Generalization: Process of combining entities into a higher-level entity (bottom-up)

Weak Entity vs Strong Entity:
- Strong Entity: Has its own key attribute (exists independently)
- Weak Entity: Depends on a strong entity for existence (no key of its own)
- Identifying Relationship: Relationship linking weak entity to its owner (double diamond)
- Partial Key: Discriminator of weak entity (dashed underline)

Converting ER Diagram to Relational Schema (Rules):
1. Strong Entity → Table with all simple attributes (key becomes PK)
2. Weak Entity → Table with partial key + PK of owner (combined as composite PK)
3. 1:1 Relationship → Merge one entity's PK into the other as FK
4. 1:N Relationship → Merge PK of "1" side into "N" side as FK
5. M:N Relationship → Create new associative table with PKs of both entities
6. Multi-valued Attribute → Separate table with attribute + FK to entity

UNIVERSITY ER SYSTEM CASE STUDY EXAMPLE
The text structure below presents a complete enterprise implementation mapping all structural criteria including keys, patterns, hierarchies, and parent-child dependencies.
[ER_DIAGRAM_EXAMPLE]

UNIT II — RELATIONAL MODEL & BASIC SQL

Relational Model Introduction:
Proposed by E.F. Codd (IBM, 1970). Organizes data in tables called RELATIONS.

Terminology:
- Relation: Table (collection of rows)
- Tuple: Row in a table
- Attribute: Column in a table
- Domain: Set of allowed values for an attribute (e.g., Age domain: 0-150)
- Degree: Number of attributes/columns
- Cardinality: Number of tuples/rows
- Null Value: Value that is unknown, not applicable, or missing (not zero or blank)
![Relational Model](/Relational_Model.png)

Relational Constraints:

1. Domain Constraints: Each attribute value must be from its defined domain
2. Key Constraints:
   - Super Key: Set of attributes that uniquely identifies a tuple
   - Candidate Key: Minimal super key (no subset is a super key)
   - Primary Key: Chosen candidate key (main identifier)
   - Alternate Key: Candidate keys not chosen as primary
   - Foreign Key: Attribute referencing PK of another table (establishes relationship)
3. Integrity Constraints:
   - Entity Integrity: Primary key cannot be NULL
   - Referential Integrity: Foreign key value must match existing PK value OR be NULL

Relational Algebra (Procedural Query Language):
Basic operations to manipulate relations (input: relation(s), output: relation).

Fundamental Operations:
- SELECT (σ): Choose rows satisfying condition. σ(condition)(R)
- PROJECT (π): Choose specific columns. π(attr1, attr2)(R)
- UNION (∪): All tuples in R1 or R2 (R1 ∪ R2) — requires same arity/domains
- SET DIFFERENCE (−): Tuples in R1 but not in R2 (R1 − R2)
- CARTESIAN PRODUCT (×): All combinations of tuples (R1 × R2)

Derived Operations:
- INTERSECTION (∩): Tuples in both R1 and R2 (R1 ∩ R2)
- JOIN (⨝): Combine related tuples from two tables
  - Theta Join (σ(condition)(R1 × R2))
  - Equi-Join (Join with equality condition)
  - Natural Join (⨝): Equi-join that removes duplicate columns
- DIVISION (÷): Tuples in R1 that match all tuples in R2

Relational Calculus (Declarative):
- Tuple Relational Calculus (TRC): Variables represent tuples. {T | Condition(T)}
- Domain Relational Calculus (DRC): Variables represent domain values.

BASIC SQL (DDL & DML)

Data Types in SQL:
- Numeric: INT, SMALLINT, DECIMAL(p,s), FLOAT, NUMBER(p,s)
- Character: CHAR(n) (fixed), VARCHAR(n)/VARCHAR2(n) (variable)
- Date/Time: DATE, TIME, TIMESTAMP
- Large Objects: BLOB (Binary), CLOB (Character)

DDL (Data Definition Language) — Defines database structure:

CREATE TABLE:
[START_SQL_CODE]
CREATE TABLE Students (
    RollNo INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT CHECK (Age >= 18),
    DeptCode VARCHAR(5),
    FOREIGN KEY (DeptCode) REFERENCES Departments(DeptCode)
);
[END_SQL_CODE]

ALTER TABLE (modify structure):
[START_SQL_CODE]
ALTER TABLE Students ADD Email VARCHAR(100);
ALTER TABLE Students MODIFY Name VARCHAR(100);
ALTER TABLE Students DROP COLUMN Age;
ALTER TABLE Students ADD CONSTRAINT unique_email UNIQUE(Email);
[END_SQL_CODE]

DROP TABLE:
[START_SQL_CODE]
DROP TABLE Students;  -- deletes table structure and data
DROP TABLE Students CASCADE CONSTRAINTS;  -- also drops dependent constraints
[END_SQL_CODE]

DML (Data Manipulation Language) — Manipulates data:

INSERT:
[START_SQL_CODE]
INSERT INTO Students VALUES (101, 'Alice', 20, 'CS101');
INSERT INTO Students (RollNo, Name, Age, DeptCode) VALUES (102, 'Bob', 22, 'IT102');
[END_SQL_CODE]

State of Table: Students (After INSERTS)
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">RollNo</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Name</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Age</th><th class="p-3 border border-cyan/20 tracking-wide text-left">DeptCode</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">101</td><td class="p-3 border border-cyan/20">Alice</td><td class="p-3 border border-cyan/20">20</td><td class="p-3 border border-cyan/20">CS101</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">102</td><td class="p-3 border border-cyan/20">Bob</td><td class="p-3 border border-cyan/20">22</td><td class="p-3 border border-cyan/20">IT102</td></tr></tbody></table>

UPDATE:
[START_SQL_CODE]
-- Modifying Alice's age from 20 to 21
UPDATE Students SET Age = 21 WHERE RollNo = 101;
[END_SQL_CODE]

State of Table: Students (After UPDATE)
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">RollNo</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Name</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Age</th><th class="p-3 border border-cyan/20 tracking-wide text-left">DeptCode</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="bg-emerald-500/10 hover:bg-emerald-500/15 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-emerald-400">101</td><td class="p-3 border border-cyan/20 text-emerald-400">Alice</td><td class="p-3 border border-cyan/20 font-bold text-emerald-400">21</td><td class="p-3 border border-cyan/20 text-emerald-400">CS101</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">102</td><td class="p-3 border border-cyan/20">Bob</td><td class="p-3 border border-cyan/20">22</td><td class="p-3 border border-cyan/20">IT102</td></tr></tbody></table>

DELETE:
[START_SQL_CODE]
-- Removing Bob's entire record from the table
DELETE FROM Students WHERE RollNo = 102;
[END_SQL_CODE]

State of Table: Students (After DELETE)
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">RollNo</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Name</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Age</th><th class="p-3 border border-cyan/20 tracking-wide text-left">DeptCode</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">101</td><td class="p-3 border border-cyan/20">Alice</td><td class="p-3 border border-cyan/20">21</td><td class="p-3 border border-cyan/20">CS101</td></tr></tbody></table>

[START_SQL_CODE]
-- Removing all remaining rows at once (Structure stays intact)
DELETE FROM Students; 
[END_SQL_CODE]

State of Table: Students (After Deleting All Rows)
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/40 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan/50 font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">RollNo</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Name</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Age</th><th class="p-3 border border-cyan/20 tracking-wide text-left">DeptCode</th></tr></thead><tbody><tr><td colspan="4" class="p-4 border border-cyan/20 text-center italic text-foreground/30">Resulting table dataset is empty (0 rows fetched)</td></tr></tbody></table>

DCL (Data Control Language) — Controls access:
[START_SQL_CODE]
GRANT SELECT, INSERT ON Students TO User1;
REVOKE INSERT ON Students FROM User1;
[END_SQL_CODE]

TCL (Transaction Control Language):
[START_SQL_CODE]
COMMIT;  -- saves all changes permanently
ROLLBACK;  -- undoes all changes since last commit
SAVEPOINT sp1;  -- creates a rollback point
[END_SQL_CODE]


UNIT III — ADVANCED SQL

Basic SQL Queries (SELECT and PROJECT):
[START_SQL_CODE]
SELECT Name, Age FROM Students WHERE DeptCode = 'CS';
[END_SQL_CODE]

Arithmetic & Logical Operations:
Arithmetic: +, -, *, /
Logical: AND, OR, NOT
Comparison: =, <>, <, >, <=, >=, BETWEEN, LIKE, IN, IS NULL

SQL Functions:

String Functions:
CONCAT(str1, str2): concatenate strings
UPPER(str), LOWER(str), INITCAP(str): case conversion
LENGTH(str): returns string length
SUBSTR(str, start, length): extract substring
INSTR(str, substr): find position of substring
LPAD(str, n, pad), RPAD(str, n, pad): pad string
LTRIM(str), RTRIM(str), TRIM(str): remove spaces

Numeric Functions:
ROUND(n, d), TRUNC(n, d): rounding/truncation
MOD(n, m): remainder
ABS(n), CEIL(n), FLOOR(n)
GREATEST(val1, val2...), LEAST(val1, val2...)

Date Functions (Oracle):
SYSDATE: current date and time
NEXT_DAY(date, 'DAY'): next specified day
ADD_MONTHS(date, n): add months
LAST_DAY(date): last day of month
MONTHS_BETWEEN(date1, date2): months difference
TO_DATE(string, format): convert string to date
TO_CHAR(date, format): format date as string

Conversion Functions:
TO_CHAR(number/date, format): convert to string
TO_NUMBER(string): convert to number
TO_DATE(string, format): convert to date

Aggregate Functions (GROUP BY, HAVING):
COUNT(*): number of rows
SUM(column): sum of values
AVG(column): average value
MAX(column), MIN(column): maximum/minimum

GROUP BY: Groups rows with the same values
[START_SQL_CODE]
SELECT DeptCode, AVG(Age) FROM Students GROUP BY DeptCode;
[END_SQL_CODE]

HAVING: Filters groups (acts like a WHERE clause for grouped entries)
[START_SQL_CODE]
SELECT DeptCode, COUNT(*) FROM Students GROUP BY DeptCode HAVING COUNT(*) > 5;
[END_SQL_CODE]

ORDER BY: Sorts results (ASC for Ascending / DESC for Descending)
[START_SQL_CODE]
SELECT * FROM Students ORDER BY Age DESC, Name ASC;
[END_SQL_CODE]

Nested Queries & Subqueries:

Single-row subquery (returns a single value):
[START_SQL_CODE]
SELECT Name FROM Students WHERE Age = (SELECT MAX(Age) FROM Students);
[END_SQL_CODE]

Multi-row subquery operators:
- IN: matches any value in a list
[START_SQL_CODE]
SELECT Name FROM Students WHERE DeptCode IN (SELECT Code FROM Depts WHERE Location='HYD');
[END_SQL_CODE]
- ANY/SOME: compares a value to at least one returned option
- ALL: compares a value to all returned values
- EXISTS / NOT EXISTS: returns true if the subquery returns at least one row (or zero rows)
[START_SQL_CODE]
SELECT Name FROM Students S WHERE EXISTS (SELECT 1 FROM Enrollments E WHERE E.RollNo = S.RollNo);
[END_SQL_CODE]

JOINS (Combining Tables):
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Join Type</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Behavior & Description</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">INNER JOIN</td><td class="p-3 border border-cyan/20">Returns only rows that have matching values in both tables.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">LEFT OUTER JOIN</td><td class="p-3 border border-cyan/20">Returns all records from the left table, and matched records from the right table (NULL if no match).</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">RIGHT OUTER JOIN</td><td class="p-3 border border-cyan/20">Returns all records from the right table, and matched records from the left table (NULL if no match).</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">FULL OUTER JOIN</td><td class="p-3 border border-cyan/20">Returns all records when there is a match in either left or right table.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">CROSS JOIN</td><td class="p-3 border border-cyan/20">Returns the Cartesian product of both tables (combines every row of A with every row of B).</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">NATURAL JOIN</td><td class="p-3 border border-cyan/20">Implicitly joins tables based on columns that share identical names and data types.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">SELF JOIN</td><td class="p-3 border border-cyan/20">A regular join where a table is joined with itself (requires explicit table aliasing).</td></tr></tbody></table>
![SQL Joins Venn Diagrams Map](/dbms_sql_joins_chart.jpg)

Syntax Examples for Core Joins:
[START_SQL_CODE]
-- INNER JOIN Example
SELECT S.Name, E.CourseID FROM Students S INNER JOIN Enrollments E ON S.RollNo = E.RollNo;

-- LEFT OUTER JOIN Example
SELECT S.Name, E.CourseID FROM Students S LEFT JOIN Enrollments E ON S.RollNo = E.RollNo;
[END_SQL_CODE]

Relational Set Operations (Requires Type-Compatible Queries):
- UNION: Combines distinct row outputs from both queries (eliminates duplicates).
- UNION ALL: Combines all row outputs from both queries (retains duplicate entries).
- INTERSECT: Returns only rows common to both query outputs.
- MINUS / EXCEPT: Returns rows present in the first query but absent in the second.

VIEWS (Virtual Tables):
A view acts as a virtual table representing the dynamic output of a pre-defined query. It does not physically store data.
[START_SQL_CODE]
CREATE VIEW StudentNames AS SELECT RollNo, Name FROM Students;
DROP VIEW StudentNames;
[END_SQL_CODE]

Types of Views:
- Updatable View: Simple view (queries a single table, contains no aggregates, no GROUP BY, and no DISTINCT keywords). Permits direct INSERT/UPDATE/DELETE.
- Non-Updatable View: Complex view containing multiple joins, calculations, or aggregate groupings. Read-only.

Constraints Implementation (in CREATE/ALTER TABLE statements):
PRIMARY KEY (column): Enforces unique, non-null structural tracking.
FOREIGN KEY (col) REFERENCES parent(col): Enforces referential validation.
UNIQUE (column): Restricts duplicate entries but allows a NULL value.
CHECK (condition): Ensures data conforms to specific validation rules (e.g., Age >= 18).
NOT NULL: Prevents blank fields.
DEFAULT value: Sets fallback properties for empty column declarations.

UNIT IV — SCHEMA REFINEMENT (NORMALIZATION)

Purpose of Normalization:
Normalization minimizes redundancy and avoids structural anomalies (insertion, update, deletion vulnerabilities) by decomposing tables cleanly.

Functional Dependency (FD):
An FD X → Y states that if two tuples have identical values for attribute set X, they must have identical values for attribute set Y.
X Element: Determinant component
Y Element: Dependent component
Trivial Dependency: Occurs when Y is a subset of X (e.g., {RollNo, Name} → Name)
Attribute Closure (X+): The set of all attributes functionally determined by attribute set X

Armstrong's Axioms (Fundamental Inference Rules):
1. Reflexivity: If Y ⊆ X, then X → Y
2. Augmentation: If X → Y, then XZ → YZ
3. Transitivity: If X → Y and Y → Z, then X → Z

Additional Derived Rules:
Union Rule: If X → Y and X → Z, then X → YZ
Decomposition Rule: If X → YZ, then X → Y and X → Z
Pseudo-transitivity: If X → Y and YZ → W, then XZ → W

Canonical Cover (Minimal Cover):
A minimal set of functional dependencies that is logically equivalent to the original set, stripped of extraneous attributes and redundant dependencies.

Normal Forms Reference Matrix:
[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Normal Form</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Core Structural Constraint Rule</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Eliminates / Resolves</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">1NF</td><td class="p-3 border border-cyan/20">All domain attributes must be atomic. No multi-valued or composite cells.</td><td class="p-3 border border-cyan/20">Repeating groups and nested arrays.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">2NF</td><td class="p-3 border border-cyan/20">Must be in 1NF + No partial dependencies (non-prime attributes cannot depend on part of a composite PK).</td><td class="p-3 border border-cyan/20">Redundancy from composite primary keys.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">3NF</td><td class="p-3 border border-cyan/20">Must be in 2NF + No transitive dependencies (non-prime attributes cannot depend on other non-prime fields).</td><td class="p-3 border border-cyan/20">Transitive updates anomalies.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">BCNF</td><td class="p-3 border border-cyan/20">For every non-trivial FD X → Y, X must be a valid Super Key.</td><td class="p-3 border border-cyan/20">Anomalies from overlapping candidate keys.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">4NF</td><td class="p-3 border border-cyan/20">Must be in BCNF + Contains zero independent Multi-Valued Dependencies (MVD: X →→ Y).</td><td class="p-3 border border-cyan/20">Asymmetric independent multi-valued facts.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-bold text-cyan/90">5NF</td><td class="p-3 border border-cyan/20">Every join dependency (PJNF) in the table must be implied entirely by its candidate keys.</td><td class="p-3 border border-cyan/20">Semantic decomposition losses.</td></tr></tbody></table>
![Database Normalization Hierarchy Diagram](/dbms_normalization_levels.png)

Surrogate Key:
An artificial, system-generated primary key (e.g., identity column, auto-increment, UUID) containing zero physical business meaning. Used when natural keys are missing or too wide.

Decomposition Verification Rules:
Lossless Join Property: Ensures a natural join of decomposed relations ($R_1 \bowtie R_2$) perfectly reproduces the original relation $R$. Valid if $R_1 \cap R_2 \rightarrow R_1$ or $R_1 \cap R_2 \rightarrow R_2$.
Dependency Preservation: Ensures that the closure of FDs on the split tables matches the original system schema, allowing validation without cross-table joins.


UNIT V — TRANSACTIONS & INDEXING

Transaction Concept:
A transaction is an execution unit of program execution that performs reading or writing operations against a database repository.

Transaction Lifecycle States:
Active State: Execution operations are actively running
Partially Committed: Final step executes, but buffer modifications are not yet flushed to physical disk
Failed State: Normal execution halts due to hardware failures or structural errors
Aborted State: Database resets to its pre-transaction baseline (Rollback action completed)
Committed State: Data changes are made fully permanent and safe in non-volatile storage
![Transaction State Transition Diagram](/dbms_transaction_states.png)

ACID Properties Architecture:
1. Atomicity: All database modifications within a single transaction succeed, or all operations fail together.
2. Consistency: Transactions migrate the schema state from one consistent boundary checkpoint to another.
3. Isolation: Concurrent schedules execute transparently without bleeding cross-transaction memory footprints.
4. Durability: Once committed, transaction values survive catastrophic operating system crashes or power faults.

Concurrency Vulnerabilities:
Lost Update Anomaly: Two transactions read identical rows; both write modifications, causing the later record to erase the former update.
Dirty Read Leak: A transaction accesses uncommitted data values currently modified by another unverified transaction.
Non-Repeatable Read: Re-reading a data row within a transaction fetches different values because a separate transaction modified it in between.
Phantom Read Problem: Re-running a scan query returns different row counts because another transaction inserted or deleted records.

Schedule Serializability & Recoverability:
Conflict Serializability: A schedule is valid if it can be transformed into a purely sequential serial order by swapping non-conflicting adjacent operations.
Cascadeless Schedule: Restricts transactions from reading uncommitted data fields, completely mitigating cascade chain rollback failures.

Concurrency Control Protocols:
Two-Phase Locking (2PL): Enforces a Growing Phase (acquiring locks) followed by a strict Shrinking Phase (releasing locks). Prevents conflict serialization errors.
Strict 2PL: Holds all exclusive locks tightly until final transaction commit or abort execution phases.
Timestamp Ordering: Arranges execution logs chronologically via unique transaction entry timestamps to intercept out-of-order write steps.

Log-Based Recovery:
Employs Write-Ahead Logging (WAL) rules stating log blocks must map to non-volatile disk blocks before actual values alter structural rows.
Redo Execution Pipeline: Re-applies log modifications forward for transactions committed before system crashes.
Undo Execution Pipeline: Reverses uncommitted transaction operations backward to clean up half-baked state modifications.
Checkpoint Milestones: Synchronizes internal dirty buffer pages out to storage disks, shortening server recovery log scans.

Indexing Architectures:

B+ Tree Indices (Balanced Tree Indexing):
Leaf Node Properties: All leaf nodes reside at the exact same depth level and are chained via pointers for accelerated sequential range scans.
Internal Node Properties: Store indexing separator keys and child page pointers strictly to guide search lookups.

Hash-Based Indexing:
Static Scheme: Employs direct math hashing algorithms to match keys to buckets. Vulnerable to long overflow chain degradation.
Dynamic Scheme: Uses Extendible Hashing where structural directories scale up or down dynamically. Optimal for $O(1)$ exact match queries; inefficient for range scans.

Clustered vs Non-Clustered Layouts:
Clustered Index: Physically sorts the data table rows on disk to match the index key order (Maximum 1 per table).
Non-Clustered Index: Maintains a completely decoupled indexing tree structure containing pointers referencing physical row locations.


LABORATORY SHORT NOTES

Advanced System Query Patterns:

Isolating the Nth Highest Rank Row Value (Oracle Context):
[START_SQL_CODE]
SELECT * FROM (
    SELECT name, marks, ROWNUM rn 
    FROM Students 
    ORDER BY marks DESC
) WHERE rn = 4;
[END_SQL_CODE]

Evaluating Conditional Set Bounds (ANY / ALL / EXISTS):
[START_SQL_CODE]
-- Evaluates true if score matches higher than the absolute lowest CS entry
SELECT name FROM Students WHERE marks > ANY (SELECT marks FROM Students WHERE dept='CS');

-- Evaluates true only if score beats the absolute maximum CS entry
SELECT name FROM Students WHERE marks > ALL (SELECT marks FROM Students WHERE dept='CS');

-- Explicit semi-join lookup evaluating existential boolean keys
SELECT name FROM Students S WHERE EXISTS (SELECT 1 FROM Enroll E WHERE E.sid = S.id);
[END_SQL_CODE]

PL/SQL Core Procedural Block Programming:

Basic Anonymous Structural Blocks & Exception Handling:
[START_SQL_CODE]
DECLARE
   v_name VARCHAR2(50);
   v_age  NUMBER := 20;
BEGIN
   SELECT name INTO v_name FROM Students WHERE roll = 101;
   DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
EXCEPTION
   WHEN NO_DATA_FOUND THEN
      DBMS_OUTPUT.PUT_LINE('No record found');
   WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/
[END_SQL_CODE]

Explicit Database Cursor State Implementations:
[START_SQL_CODE]
DECLARE
   CURSOR cur_students IS SELECT name, marks FROM Students;
   v_name  Students.name%TYPE;
   v_marks Students.marks%TYPE;
BEGIN
   OPEN cur_students;
   LOOP
      FETCH cur_students INTO v_name, v_marks;
      EXIT WHEN cur_students%NOTFOUND;
      DBMS_OUTPUT.PUT_LINE(v_name || ': ' || v_marks);
   END LOOP;
   CLOSE cur_students;
END;
/
[END_SQL_CODE]

Database Procedures & Functions:
[START_SQL_CODE]
-- Database Procedure Definition Example
CREATE OR REPLACE PROCEDURE proc_name(param1 IN NUMBER, param2 OUT VARCHAR2) IS
BEGIN
   SELECT name INTO param2 FROM Students WHERE id = param1;
EXCEPTION
   WHEN NO_DATA_FOUND THEN
      param2 := 'Not Found';
END;
/

-- Database Function Definition Example
CREATE OR REPLACE FUNCTION func_name(p_id NUMBER) RETURN VARCHAR2 IS
   v_result VARCHAR2(100);
BEGIN
   SELECT name INTO v_result FROM Students WHERE id = p_id;
   RETURN v_result;
END;
/
[END_SQL_CODE]

Automated Database Schema Triggers:
[START_SQL_CODE]
CREATE OR REPLACE TRIGGER trig_name
BEFORE INSERT OR UPDATE OR DELETE ON Students
FOR EACH ROW
DECLARE
   v_user VARCHAR2(50);
BEGIN
   SELECT USER INTO v_user FROM DUAL;
   :NEW.updated_by := v_user;
   :NEW.updated_date := SYSDATE;
END;
/
[END_SQL_CODE]

Java JDBC Programmatic Database Connectivity Pipeline:
[START_SQL_CODE]
import java.sql.*;

public class DBConnect {
    public static void main(String[] args) throws Exception {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "user", "pass");
        
        // Parameterized PreparedStatement Protection
        PreparedStatement pstmt = conn.prepareStatement("INSERT INTO Students VALUES (?, ?, ?)");
        pstmt.setInt(1, 105);
        pstmt.setString(2, "Charlie");
        pstmt.setInt(3, 21);
        
        int rowsAffected = pstmt.executeUpdate();
        pstmt.close();
        conn.close();
    }
}
[END_SQL_CODE]
`;