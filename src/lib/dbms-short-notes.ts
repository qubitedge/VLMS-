export const dbmsShortNotes = `DATABASE MANAGEMENT SYSTEMS - SHORT NOTES
(As per JNTUGV / CEV R23 Syllabus)

INTRODUCTION TO DBMS

A Database Management System (DBMS) is software that enables users to define, create, maintain, and control access to databases. It acts as an intermediary between users and the database, ensuring data is consistently organized and remains easily accessible.

Why DBMS over File System?

Traditional File System issues: Data redundancy (duplicate data), data inconsistency (conflicting copies), difficult data access, no concurrent access control, security issues, no integrity constraints.
DBMS Advantages: Controls redundancy, avoids inconsistency, provides data sharing, enforces standards, maintains integrity, ensures security, balances conflicting requirements, enables backup/recovery.

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

Schema, Instance, and Data Independence:
- Schema: Overall description/structure of the database (blueprint) — changes rarely
- Instance: Actual data stored at a particular moment — changes frequently
- Physical Data Independence: Changes to storage structures don't affect conceptual schema
- Logical Data Independence: Changes to conceptual schema don't affect external schemas

Three-Tier Schema Architecture:
Goal: Separate user applications from physical database for data independence.
- External Level (View Level): How individual users see the data (different views)
- Conceptual Level (Logical Level): What data is stored and relationships among them
- Internal Level (Physical Level): How data is actually stored on storage devices

Database System Structure & Architecture:
- Centralized Architecture: All components on a single machine (traditional mainframe)
- Client-Server Architecture: Clients send requests, Database Server processes them
  - Two-Tier: Client connects directly to DB server (ODBC/JDBC)
  - Three-Tier: Client → Application Server → Database Server (web applications)


UNIT I — ENTITY RELATIONSHIP MODEL

ER Model Introduction:
ER Model is a high-level conceptual data model used to design databases. It represents real-world entities and relationships visually using ER Diagrams.

Components of ER Diagram:

1. ENTITIES:
   - Real-world object distinguishable from others (Person, Product, Course)
   - Represented by Rectangle
   - Types: Strong Entity (exists independently) and Weak Entity (depends on another entity)

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
CREATE TABLE Students (
    RollNo INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT CHECK (Age >= 18),
    DeptCode VARCHAR(5),
    FOREIGN KEY (DeptCode) REFERENCES Departments(DeptCode)
);

ALTER TABLE (modify structure):
ALTER TABLE Students ADD Email VARCHAR(100);
ALTER TABLE Students MODIFY Name VARCHAR(100);
ALTER TABLE Students DROP COLUMN Age;
ALTER TABLE Students ADD CONSTRAINT unique_email UNIQUE(Email);

DROP TABLE:
DROP TABLE Students;  -- deletes table structure and data
DROP TABLE Students CASCADE CONSTRAINTS;  -- also drops dependent constraints

DML (Data Manipulation Language) — Manipulates data:

INSERT:
INSERT INTO Students VALUES (101, 'Alice', 20, 'CS101');
INSERT INTO Students (RollNo, Name) VALUES (102, 'Bob');

UPDATE:
UPDATE Students SET Age = 21 WHERE RollNo = 101;

DELETE:
DELETE FROM Students WHERE RollNo = 102;
DELETE FROM Students;  -- deletes all rows (table structure remains)

DCL (Data Control Language) — Controls access:
GRANT SELECT, INSERT ON Students TO User1;
REVOKE INSERT ON Students FROM User1;

TCL (Transaction Control Language):
COMMIT;  -- saves all changes permanently
ROLLBACK;  -- undoes all changes since last commit
SAVEPOINT sp1;  -- creates a rollback point


UNIT III — ADVANCED SQL

Basic SQL Queries (SELECT and PROJECT):

SELECT column1, column2 FROM table_name WHERE condition;

Example:
SELECT Name, Age FROM Students WHERE DeptCode = 'CS';

Arithmetic & Logical Operations:
Arithmetic: +, -, *, /
Logical: AND, OR, NOT
Comparison: =, <>, <, >, <=, >=, BETWEEN, LIKE, IN, IS NULL

SQL Functions:

String Functions:
- CONCAT(str1, str2) or || — concatenate strings
- UPPER(str), LOWER(str), INITCAP(str) — case conversion
- LENGTH(str) — returns string length
- SUBSTR(str, start, length) — extract substring
- INSTR(str, substr) — find position of substring
- LPAD(str, n, pad), RPAD(str, n, pad) — pad string
- LTRIM(str), RTRIM(str), TRIM(str) — remove spaces

Numeric Functions:
- ROUND(n, d), TRUNC(n, d) — rounding/truncation
- MOD(n, m) — remainder
- ABS(n), CEIL(n), FLOOR(n)
- GREATEST(val1, val2...), LEAST(val1, val2...)

Date Functions (Oracle):
- SYSDATE — current date and time
- NEXT_DATE(date, 'DAY') — next specified day
- ADD_MONTHS(date, n) — add months
- LAST_DAY(date) — last day of month
- MONTHS_BETWEEN(date1, date2) — months difference
- TO_DATE(string, format) — convert string to date
- TO_CHAR(date, format) — format date as string

Conversion Functions:
- TO_CHAR(number/date, format) — convert to string
- TO_NUMBER(string) — convert to number
- TO_DATE(string, format) — convert to date

Aggregate Functions (GROUP BY, HAVING):
- COUNT(*) — number of rows
- SUM(column) — sum of values
- AVG(column) — average
- MAX(column), MIN(column) — maximum/minimum

GROUP BY: Groups rows with same values
SELECT DeptCode, AVG(Age) FROM Students GROUP BY DeptCode;

HAVING: Filters groups (like WHERE for groups)
SELECT DeptCode, COUNT(*) FROM Students GROUP BY DeptCode HAVING COUNT(*) > 5;

ORDER BY: Sorts results (ASC/DESC)
SELECT * FROM Students ORDER BY Age DESC, Name ASC;

Nested Queries & Subqueries:

Single-row subquery (returns one value):
SELECT Name FROM Students WHERE Age = (SELECT MAX(Age) FROM Students);

Multi-row subquery operators:
- IN: matches any value in list
  SELECT Name FROM Students WHERE DeptCode IN (SELECT Code FROM Depts WHERE Location='HYD');
- ANY/SOME: compares to at least one returned value
- ALL: compares to all returned values
- EXISTS: returns true if subquery returns at least one row
  SELECT Name FROM Students S WHERE EXISTS (SELECT 1 FROM Enrollments E WHERE E.RollNo = S.RollNo);
- NOT EXISTS: returns true if subquery returns no rows

JOINS (Combining tables):

INNER JOIN (or JOIN): Only matching rows from both tables
SELECT S.Name, E.CourseID FROM Students S INNER JOIN Enrollments E ON S.RollNo = E.RollNo;

LEFT OUTER JOIN: All rows from left table + matching from right (NULL if no match)
SELECT S.Name, E.CourseID FROM Students S LEFT JOIN Enrollments E ON S.RollNo = E.RollNo;

RIGHT OUTER JOIN: All rows from right table + matching from left
FULL OUTER JOIN: All rows from both tables
CROSS JOIN: Cartesian product (every row from A with every row from B)
NATURAL JOIN: Joins automatically on columns with same name
SELF JOIN: Table joined with itself (requires alias)

Relational Set Operations (on compatible tables):
- UNION: Combines results (removes duplicates)
- UNION ALL: Combines results (keeps duplicates)
- INTERSECT: Returns rows common to both queries
- MINUS/EXCEPT: Returns rows in first query but not in second

VIEWS (Virtual Tables):
CREATE VIEW StudentNames AS SELECT RollNo, Name FROM Students;
Drop View: DROP VIEW StudentNames;

Types of Views:
- Updatable View: Simple view (single table, no aggregates, no GROUP BY, no DISTINCT) — allows INSERT/UPDATE/DELETE
- Non-Updatable View: Complex view (joins, aggregates, GROUP BY) — read-only

Constraints Implementation (in CREATE/ALTER):
- PRIMARY KEY (column)
- FOREIGN KEY (col) REFERENCES parent(col)
- UNIQUE (column)
- CHECK (condition)
- NOT NULL
- DEFAULT value


UNIT IV — SCHEMA REFINEMENT (NORMALIZATION)

Purpose of Normalization:
Minimize redundancy and avoid anomalies (insertion, update, deletion anomalies) by decomposing tables properly.

Functional Dependency (FD):
An FD X → Y means: For any two tuples, if they have same X value, they must have same Y value.
- X = determinant, Y = dependent
- Trivial FD: Y ⊆ X (e.g., {RollNo, Name} → Name)
- Closure of attributes (X+): All attributes functionally determined by X

Armstrong's Axioms (Rules for FDs):
1. Reflexivity: If Y ⊆ X, then X → Y
2. Augmentation: If X → Y, then XZ → YZ
3. Transitivity: If X → Y and Y → Z, then X → Z

Additional Rules (derived):
- Union: If X → Y and X → Z, then X → YZ
- Decomposition: If X → YZ, then X → Y and X → Z
- Pseudo-transitivity: If X → Y and YZ → W, then XZ → W

Closure of Set of FDs (F+): All FDs that can be inferred from given FDs

Canonical Cover (Minimal Cover):
- No extraneous attributes on left or right side
- Left side reduced to minimal attributes

Normal Forms:

1NF (First Normal Form):
- All attributes must be atomic (no multi-valued or composite attributes)
- Each cell contains single value
- Eliminate repeating groups (separate tables)

2NF (Second Normal Form):
- Must be in 1NF
- No Partial Dependency: No non-prime attribute depends on part of a candidate key
- Removes: Composite PK where some attributes depend on only part of the key

3NF (Third Normal Form):
- Must be in 2NF
- No Transitive Dependency: No non-prime attribute depends on another non-prime attribute
- Removes: A → B and B → C where A is key, C is non-prime

BCNF (Boyce-Codd Normal Form):
- Must be in 3NF
- For every FD X → Y, X must be a superkey
- Stronger than 3NF (handles overlapping candidate keys)

4NF (Fourth Normal Form):
- Must be in BCNF
- No Multi-Valued Dependency (MVD) that is not a functional dependency
- MVD: X →→ Y means Y is independent of remaining attributes (Z)
- Removes: For a key X, Y and Z are independent multi-valued facts

5NF (Projection-Join Normal Form / PJNF):
- Must be in 4NF
- No Join Dependency that is not implied by candidate keys
- Every join dependency is implied by candidate keys

Surrogate Key:
- Artificial primary key (auto-increment, UUID) with no business meaning
- Used when natural key is too wide, changes over time, or doesn't exist

Lossless Join Decomposition:
- Decomposing R into R1 and R2 where natural join of R1 and R2 exactly reproduces R
- Condition: R1 ∩ R2 → R1 OR R1 ∩ R2 → R2

Dependency Preserving Decomposition:
- The closure of all FDs on decomposed tables must be equivalent to original FDs
- Ensures constraints can be checked without performing joins


UNIT V — TRANSACTIONS & INDEXING

Transaction Concept:
A transaction is a logical unit of work that consists of one or more database operations (read/write) that must be executed atomically.

Transaction States:
- Active: Transaction is executing
- Partially Committed: Final operation executed (but not yet permanent)
- Failed: Transaction cannot complete normally
- Aborted: Transaction rolled back (database restored to original state)
- Committed: Transaction successfully completed (changes permanent)

ACID Properties:
1. Atomicity: All operations of a transaction complete or NONE complete (all-or-nothing)
2. Consistency: Transaction transforms database from one valid state to another (maintains all constraints)
3. Isolation: Concurrent transactions appear to execute serially (no interference)
4. Durability: Once committed, changes persist even after system failure

Concurrent Executions (Problems):
- Lost Update: Two transactions read same value, update, one overwrites the other
- Dirty Read: Transaction reads uncommitted data from another transaction
- Non-Repeatable Read: Same query returns different results when repeated (update between reads)
- Phantom Read: New rows appear/disappear between reads (insert/delete between reads)

Serializability:
- A schedule is serializable if its effect is equivalent to some serial execution of transactions
- Conflict Serializability: Can be transformed to serial schedule by swapping non-conflicting operations
- View Serializability: More general (harder to check)

Recoverability:
- Recoverable Schedule: Transactions commit only after all transactions whose data they read have committed
- Cascadeless Schedule: No transaction reads uncommitted data (avoids cascading rollbacks)
- Strict Schedule: No read/write after a write until the writing transaction commits

Concurrency Control Protocols:

1. Lock-Based Protocols:
   - Shared Lock (S-lock, read lock): Multiple transactions can hold
   - Exclusive Lock (X-lock, write lock): Only one transaction
   - Two-Phase Locking (2PL): Growing phase (acquire locks) then shrinking phase (release locks)
   - Strict 2PL: Release locks only after commit/abort (most common)
   - Deadlock: Transaction T1 waits for T2, T2 waits for T1 → Cycle
   - Deadlock Prevention: Wait-Die (older waits), Wound-Wait (older preempts)
   - Deadlock Detection: Wait-for graph, timeout

2. Timestamp-Based Protocols:
   - Each transaction gets unique timestamp (system time or counter)
   - Read/Write operations check timestamps to resolve conflicts
   - Thomas Write Rule: Ignores outdated writes

3. Optimistic Concurrency Control:
   - Validate phase after execution: check for conflicts before commit
   - Good for low-conflict environments

Failure Classification:
- Transaction Failures: Logic errors, system errors (deadlock)
- System Failures (crash): Power failure, OS bug
- Media Failures: Disk head crash, data corruption

Storage Types:
- Volatile Storage: Cache, RAM (data lost on power failure)
- Non-Volatile Storage: SSD, HDD, Flash (persistent but slower)

Recovery Algorithm:
- Log-Based Recovery: Write-Ahead Logging (WAL) — log records written before data
- Log contains: <Transaction ID, Old Value, New Value, Operation>
- Redo: Apply logged operations (for committed transactions after crash)
- Undo: Reverse logged operations (for uncommitted transactions after crash)
- Checkpoint: Synchronize log and database (reduces recovery time)

INDEXING TECHNIQUES

B+ Trees (Most common indexing structure):
- Balanced tree where all leaves at same depth
- Internal nodes: store keys + pointers to children
- Leaf nodes: store keys + pointers to actual data (or data itself)
- Order m: Each node has at most m children, at least ⌈m/2⌉ children (except root)

Operations on B+ Trees:
- Search: O(log n) — traverse from root to leaf using keys
- Insert: Find leaf, insert key. If leaf overflows (m keys), split into two nodes
- Delete: Find and remove key. If underflow (< ⌈m/2⌉ keys), merge or redistribute

Hash-Based Indexing:
- Uses hash function to map key directly to bucket containing data
- Static Hashing: Fixed number of buckets (causes overflow chains)
- Dynamic Hashing: Extendible hashing — directory of buckets that can grow/shrink
- O(1) average search time (faster than B+ tree for exact match)
- Not good for range queries (unlike B+ trees)

Clustered vs Non-Clustered Index:
- Clustered Index: Data physically ordered by index key (one per table) — faster range queries
- Non-Clustered Index: Separate structure pointing to data (multiple per table)


LABORATORY SHORT NOTES

SQL*PLUS / MySQL Basic Commands:

Connecting to Database (Oracle):
sqlplus username/password@database
SHOW TABLES; DESC table_name;  -- describe table structure

DDL Commands:
CREATE TABLE table_name (col1 datatype constraint, col2 datatype);
ALTER TABLE table_name ADD (col datatype);
ALTER TABLE table_name MODIFY (col new_datatype);
ALTER TABLE table_name DROP COLUMN col;
DROP TABLE table_name;
TRUNCATE TABLE table_name;  -- removes all rows (faster than DELETE)

DML Commands:
INSERT INTO table VALUES (value1, value2);
INSERT INTO table (col1, col2) VALUES (val1, val2);
UPDATE table SET col = value WHERE condition;
DELETE FROM table WHERE condition;
SELECT * FROM table WHERE condition;

DCL Commands:
GRANT privilege ON object TO user;
REVOKE privilege ON object FROM user;
COMMIT; ROLLBACK; SAVEPOINT name; ROLLBACK TO SAVEPOINT name;

Advanced Query Patterns:

Find nth rank student:
SELECT * FROM (SELECT name, marks, ROWNUM rn FROM Students ORDER BY marks DESC) WHERE rn = 4;

Using ANY/ALL/IN/EXISTS:
SELECT name FROM Students WHERE marks > ANY (SELECT marks FROM Students WHERE dept='CS');
SELECT name FROM Students WHERE marks > ALL (SELECT marks FROM Students WHERE dept='CS');
SELECT name FROM Students WHERE dept IN ('CS', 'IT');
SELECT name FROM Students WHERE EXISTS (SELECT 1 FROM Enroll WHERE Students.id = Enroll.sid);

Set Operations:
SELECT name FROM Students WHERE dept='CS'
UNION / INTERSECT / MINUS
SELECT name FROM Students WHERE marks > 80;

Aggregation with GROUP BY & HAVING:
SELECT dept, AVG(marks), COUNT(*) FROM Students
GROUP BY dept
HAVING AVG(marks) > 70;

Views:
CREATE VIEW top_students AS SELECT name, marks FROM Students WHERE marks > 80;
CREATE OR REPLACE VIEW view_name AS SELECT...;
DROP VIEW view_name;

PL/SQL Fundamentals:

Basic PL/SQL Block Structure:
DECLARE
   -- variable declarations
   v_name VARCHAR2(50);
   v_age NUMBER := 20;
   CURSOR c1 IS SELECT * FROM Students;
BEGIN
   -- executable statements
   SELECT name INTO v_name FROM Students WHERE roll = 101;
   DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
EXCEPTION
   -- error handling
   WHEN NO_DATA_FOUND THEN
      DBMS_OUTPUT.PUT_LINE('No record found');
   WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/

Control Structures:

IF-THEN-ELSE:
IF marks >= 90 THEN grade := 'A';
ELSIF marks >= 75 THEN grade := 'B';
ELSE grade := 'C';
END IF;

CASE:
CASE grade
   WHEN 'A' THEN result := 'Excellent';
   WHEN 'B' THEN result := 'Good';
   ELSE result := 'Average';
END CASE;

Loops:
-- Simple LOOP
LOOP
   EXIT WHEN counter > 10;
   counter := counter + 1;
END LOOP;

-- WHILE LOOP
WHILE counter <= 10 LOOP
   counter := counter + 1;
END LOOP;

-- FOR LOOP
FOR i IN 1..10 LOOP
   DBMS_OUTPUT.PUT_LINE(i);
END LOOP;

-- Numeric FOR LOOP (reverse)
FOR i IN REVERSE 1..10 LOOP

Cursors:

Explicit Cursor:
DECLARE
   CURSOR cur_students IS SELECT name, marks FROM Students;
   v_name Students.name%TYPE;
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

Cursor FOR Loop (simpler):
BEGIN
   FOR rec IN (SELECT name, marks FROM Students) LOOP
      DBMS_OUTPUT.PUT_LINE(rec.name || ': ' || rec.marks);
   END LOOP;
END;
/

Cursor with Parameters:
CURSOR cur_by_dept(p_dept VARCHAR2) IS SELECT * FROM Students WHERE dept = p_dept;

FOR UPDATE CURSOR (for locking rows during update):
CURSOR cur IS SELECT * FROM Students WHERE status='PENDING' FOR UPDATE;
WHERE CURRENT OF clause: UPDATE Students SET status='DONE' WHERE CURRENT OF cur;

Procedures:

CREATE OR REPLACE PROCEDURE proc_name(param1 IN NUMBER, param2 OUT VARCHAR2, param3 IN OUT DATE) IS
   v_local VARCHAR2(100);
BEGIN
   -- logic
   SELECT name INTO param2 FROM Students WHERE id = param1;
EXCEPTION
   WHEN NO_DATA_FOUND THEN
      param2 := 'Not Found';
END;
/

Execute procedure:
EXEC proc_name(101, :result, :date_param);  -- : indicates variable in SQL*Plus

Functions:

CREATE OR REPLACE FUNCTION func_name(p_id NUMBER) RETURN VARCHAR2 IS
   v_result VARCHAR2(100);
BEGIN
   SELECT name INTO v_result FROM Students WHERE id = p_id;
   RETURN v_result;
EXCEPTION
   WHEN NO_DATA_FOUND THEN
      RETURN NULL;
END;
/

Call in SQL:
SELECT name, func_name(roll) FROM Students;

Triggers:

BEFORE/AFTER Row/Statement Trigger:
CREATE OR REPLACE TRIGGER trig_name
BEFORE INSERT OR UPDATE OR DELETE ON Students
FOR EACH ROW  -- Omit for statement-level trigger
DECLARE
   v_user VARCHAR2(50);
BEGIN
   SELECT USER INTO v_user FROM DUAL;
   :NEW.updated_by := v_user;  -- :NEW refers to new row value
   :NEW.updated_date := SYSDATE;
END;
/

Trigger Types:
- BEFORE ROW: Modify values before insertion/update
- AFTER ROW: Use for auditing after change
- INSTEAD OF: Used on views (non-updatable views)
- Compound Trigger: Multiple timing points in one trigger

Trigger Variables:
- :OLD — old value (before update/delete)
- :NEW — new value (after insert/update)
- INSERTING, UPDATING, DELETING — Boolean predicates

Exception Handling:

Built-in Exceptions:
- NO_DATA_FOUND: SELECT...INTO returns no rows
- TOO_MANY_ROWS: SELECT...INTO returns multiple rows
- DUP_VAL_ON_INDEX: Duplicate value on unique/primary key
- ZERO_DIVIDE: Division by zero
- INVALID_NUMBER: Conversion error

User-Defined Exceptions:
DECLARE
   e_custom EXCEPTION;
   PRAGMA EXCEPTION_INIT(e_custom, -20001);
BEGIN
   IF condition THEN
      RAISE e_custom;
   END IF;
EXCEPTION
   WHEN e_custom THEN
      DBMS_OUTPUT.PUT_LINE('Custom error');
END;
/

RAISE_APPLICATION_ERROR:
RAISE_APPLICATION_ERROR(-20001, 'This is my custom error message');

NULLIF and COALESCE:
SELECT NULLIF(a, b) FROM dual;  -- Returns NULL if a equals b, else returns a
SELECT COALESCE(col1, col2, col3, 'Default') FROM table;  -- Returns first non-NULL

JDBC Database Connectivity (Java):

Basic Connection Steps:
import java.sql.*;

Class.forName("oracle.jdbc.driver.OracleDriver");
Connection conn = DriverManager.getConnection(
    "jdbc:oracle:thin:@localhost:1521:XE", "username", "password");
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM Students");

while (rs.next()) {
    System.out.println(rs.getInt("roll") + " " + rs.getString("name"));
}

PreparedStatement (for parameters):
PreparedStatement pstmt = conn.prepareStatement("INSERT INTO Students VALUES (?, ?)");
pstmt.setInt(1, 101);
pstmt.setString(2, "Alice");
pstmt.executeUpdate();

Insert using JDBC:
String sql = "INSERT INTO Students (roll, name, age) VALUES (?, ?, ?)";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, roll);
pstmt.setString(2, name);
pstmt.setInt(3, age);
int rows = pstmt.executeUpdate();  -- returns number of rows inserted

Delete using JDBC:
String sql = "DELETE FROM Students WHERE roll = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, roll);
int rows = pstmt.executeUpdate();

Transaction in JDBC:
conn.setAutoCommit(false);  -- disable auto-commit
// execute multiple DML operations
conn.commit();  -- or conn.rollback();

Always close resources:
rs.close(); stmt.close(); conn.close();

Indexing Performance Test:
CREATE INDEX idx_name ON Students(name);  -- create index
SELECT * FROM Students WHERE name = 'Alice';  -- faster with index
DROP INDEX idx_name;  -- remove index
`;