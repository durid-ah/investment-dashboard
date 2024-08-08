CREATE TABLE investment (
  id INTEGER PRIMARY KEY NOT NULL,
  account_id INTEGER NOT NULL,
  ticker TEXT NOT NULL,
  shares REAL NOT NULL,
  value REAL NOT NULL,
  category TEXT NULL,
  FOREIGN KEY (account_id) REFERENCES account(id),
  FOREIGN KEY (ticker) REFERENCES ticker(ticker),
  FOREIGN KEY (category) REFERENCES investment_category(category)
);