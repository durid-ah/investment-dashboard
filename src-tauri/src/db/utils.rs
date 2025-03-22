use diesel::{connection::SimpleConnection, Connection, SqliteConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use std::env;

const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

#[derive(Clone, serde::Serialize)]
pub struct List<T>(pub Vec<T>);

pub fn establish_connection() -> SqliteConnection {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    SqliteConnection::establish(&database_url)
        .map(|mut conn| {
            conn.batch_execute("PRAGMA foreign_keys = ON")
                .expect("failed to enable foreign keys");

            conn.run_pending_migrations(MIGRATIONS)
                .expect("failed to run the pending migrations");

            conn
        })
        .unwrap()
}

#[cfg(test)]
mod tests {
    use diesel::RunQueryDsl;

    use crate::db::{models::NewInvestment, utils::establish_connection};

    #[test]
    fn test_foreign_key() {
        use crate::schema::investment;

        dotenvy::dotenv().unwrap();

        let connection = &mut establish_connection();
        let investment = NewInvestment {
            account_id: 0,
            ticker: "test".to_owned(),
            shares: 1.0,
            value: 1.0,
            category: None,
        };

        let val = diesel::insert_into(investment::table)
            .values(&investment)
            .execute(connection);

        assert!(val.is_err())
    }
}
