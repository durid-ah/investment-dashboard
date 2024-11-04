use diesel::query_dsl::methods::FindDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;

use crate::db::models::NewAccount;
use crate::db::models::*;
use crate::db::utils::establish_connection;
use crate::db::utils::List;

#[tauri::command]
pub fn add_account(account_name: &str) {
    use crate::schema::account;
    use diesel::RunQueryDsl;

    let conn = &mut establish_connection();

    diesel::insert_into(account::table)
        .values(&NewAccount {
            account_name: account_name.to_owned(),
        })
        .execute(conn)
        .expect("add_account failed");
}

#[tauri::command]
pub fn update_account(account_update: Account) -> Result<usize, String> {
    use crate::schema::account::dsl::*;
    let conn = &mut establish_connection();

    diesel::update(account.find(account_update.id))
        .set((account_name.eq(account_update.account_name),))
        .execute(conn)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn get_accounts() -> List<Account> {
    use crate::schema::account::dsl::*;
    use diesel::QueryDsl;
    use diesel::RunQueryDsl;
    use diesel::SelectableHelper;

    let conn = &mut establish_connection();

    let results = account
        .select(Account::as_select())
        .load(conn)
        .expect("get_accounts: failed to get accounts");

    List(results)
}

#[tauri::command]
pub fn delete_account(id_to_delete: i32) {
    use crate::schema::account::dsl::*;
    use diesel::ExpressionMethods;
    use diesel::RunQueryDsl;

    let conn = &mut establish_connection();

    diesel::delete(account)
        .filter(id.eq(id_to_delete))
        .execute(conn)
        .expect("delete failed");
}
