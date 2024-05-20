use rusqlite::{config::DbConfig, Connection};

pub const DB_NAME: &str = "test.db";

#[derive(Clone, serde::Serialize)]
pub struct List<T>(pub Vec<T>);

pub fn create_connection() -> Connection {
    let conn = Connection::open(DB_NAME).unwrap();
    let _ = conn.set_db_config(DbConfig::SQLITE_DBCONFIG_ENABLE_FKEY, true);
    let _ = conn.pragma_update(None, "foreign_keys", "ON");
    return conn;
}
