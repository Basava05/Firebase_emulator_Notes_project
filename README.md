# Notes Management System using Firebase Firestore (NoSQL)

This project is a DBMS-oriented mini project that demonstrates how a modern NoSQL database can be used to implement core database concepts such as CRUD operations, constraints (assertion-like validation), and triggers.  
<br>
The application is developed using Firebase Firestore and the Firebase Emulator Suite for local backend execution.

<br>

## Project Highlights

A complete mini-project demonstrating:
<br>
- Firestore CRUD operations  
- Firestore Security Rules (Assertions & Constraints)  
- Cloud Function Triggers  
- Firebase Emulator Suite (Local Backend)
<br>

## Abstract

The Notes Management System allows users to create, view, update, and delete notes through a web-based interface. All data is stored in Firebase Firestore, which is a document-based NoSQL database.  
<br>
The project uses the Firebase Emulator Suite to safely simulate backend database operations on a local machine. Real-time data updates, validation using Firestore security rules, and automatic backend triggers using Cloud Functions are the key features of this project.

<br>

## Introduction

Database Management Systems (DBMS) are essential for storing, managing, and retrieving data efficiently. Traditional relational databases rely on tables, rows, and columns, whereas NoSQL databases like Firebase Firestore use collections and documents.  
<br>
This project explores how DBMS concepts can be implemented using a NoSQL approach. Firebase Firestore is used as the backend database, while the Firebase Emulator Suite enables local execution of Firestore, rules, and triggers, making the project safe and suitable for academic demonstrations.

<br>

## Project Architecture

The architecture of the project follows a client–server model.

<br>

### Architecture Flow

User Interface (HTML + CSS + JavaScript)  
<br>
↓  
<br>
Firestore JavaScript SDK  
<br>
↓  
<br>
Firebase Firestore Emulator (Local NoSQL Database)  
<br>
↓  
<br>
Firestore Rules Engine (Assertions & Constraints)  
<br>
↓  
<br>
Cloud Functions Emulator (Triggers)

<br>

## Why Firebase Firestore is a NoSQL Database

Firebase Firestore is classified as a NoSQL database because:
<br>
- Data is stored in collections and documents instead of tables and rows  
- A predefined schema is not required  
- Each document can have different fields  
- Data is stored in a JSON-like format  
- Built-in real-time data synchronization is supported  

<br>

## Database Design

### Collections Used

### 1. notes

This collection stores user notes.

**Fields:**
<br>
- title (string)  
- content (string)  
- ownerId (string)  
- createdAt (timestamp)  
- updatedAt (timestamp)

<br>

### 2. auditLogs

This collection stores audit records generated automatically using triggers.

**Fields:**
<br>
- action (string)  
- noteId (string)  
- ownerId (string)  
- createdAt (timestamp)

<br>

## E–R Diagram Description (DBMS Style)

The system consists of the following entities:
<br>
- USER  
- NOTE  
- AUDIT_LOG  

<br>

**Relationships:**
<br>
- Each USER can create multiple NOTES (1:N)  
- Each NOTE can generate multiple AUDIT_LOG entries using triggers (1:N)  

<br>

## CRUD Operations Implementation

### Create Operation

A new note is created using the `addDoc()` function.  
<br>
This corresponds to the **INSERT** operation in DBMS.

<br>

### Read Operation

Notes are retrieved using the `onSnapshot()` function, which listens for real-time changes.  
<br>
This corresponds to the **SELECT** operation in DBMS.

<br>

### Update Operation

Note content and title are modified using the `updateDoc()` function.  
<br>
This corresponds to the **UPDATE** operation in DBMS.

<br>

### Delete Operation

Notes are deleted using the `deleteDoc()` function.  
<br>
This corresponds to the **DELETE** operation in DBMS.

<br>

## Validation and Assertions

Firestore does not support SQL-style assertions directly.  
<br>
Instead, validation is implemented using **Firestore Security Rules**.

These rules ensure:
<br>
- Required fields are present  
- Title cannot be empty  
- Only the owner can update or delete a note  

<br>
This behavior serves the same purpose as **assertions and constraints** in traditional DBMS.

<br>

## Triggers Implementation

Triggers are implemented using **Firebase Cloud Functions**.  
<br>
Whenever a new note is created in the `notes` collection, a trigger automatically inserts a corresponding record into the `auditLogs` collection.  
<br>
This behavior is equivalent to **database triggers** in SQL.

<br>

## Firebase Emulator Suite

The Firebase Emulator Suite is used to run:
<br>
- Firestore Emulator (Database)  
- Cloud Functions Emulator (Triggers)  
- Emulator UI (Database Viewer)  

<br>
The Emulator Suite allows the complete application to run locally without sending data to production Firebase servers.

<br>

## Running the Project Locally

### Start Firebase Emulators

```bash
npm install -g firebase-tools
firebase init
firebase emulators:start
npx http-server . -p 5000


