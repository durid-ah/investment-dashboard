use crate::db::utils::create_connection;
use crate::db::utils::List;

#[derive(Clone, serde::Serialize)]
pub struct Account {
    id: i64,
    account: String,
}

#[tauri::command]
pub fn add_account(account_name: &str) {
    let conn = create_connection();
    conn.execute(
        "INSERT INTO account (account) VALUES (?1);",
        (account_name,),
    )
    .expect("create account: failed prepare statement");
}

#[tauri::command]
pub fn get_accounts() -> List<Account> {
    let conn = create_connection();
    let mut stmt = conn.prepare("SELECT id, account FROM account").unwrap();

    let rows = stmt
        .query_map([], |row| {
            let id: i64 = row.get(0)?;
            let account: String = row.get(1)?;

            Ok(Account { id, account })
        })
        .unwrap()
        .map(|row| row.unwrap())
        .collect();

    List(rows)
}

#[tauri::command]
pub fn delete_account(id: usize) {
    let conn = create_connection();

    conn.execute("DELETE FROM account WHERE id = ?1", (id,))
        .expect("Prepare statement failed");
}
