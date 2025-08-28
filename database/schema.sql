
-- user Table
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    passwordHASH TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE survey_responses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT,

    -- demographics
    age INTEGER,
    location TEXT,
    maritalStatus TEXT,
    householdSize INTEGER,
    employmentStatus TEXT,
    hasAgingParents TEXT,

    -- health
    overallHealth TEXT,
    chronicConditions TEXT,
    mobilityLevel TEXT,
    hasLongTermCareNeeds TEXT,

    -- finances
    annualIncome INTEGER,
    insuranceCoverage TEXT,
    monthlyExpenses INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- create indexes for performance
CREATE INDEX idxSurveyResponsesUserId ON survey_responses(userId);
CREATE INDEX idxUsersEmail ON users(email);