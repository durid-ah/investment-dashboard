import Link from "next/link";
import Checkbox from "../components/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { Account } from "../backend-calls/account-calls";
import { EditableValue } from "../components/editable-text";
import { useUpdateAccountMutation } from "../hooks/account-hooks";

type AccountProp = {
  account: Account,
}

export function AccountRow({account} : AccountProp) {
  const internalQueryClient = useQueryClient()
  const mutation = useUpdateAccountMutation()

  const toggleSelect = (accountId: number) => {
    internalQueryClient.setQueryData(['accounts'], (oldAccts: Account[]) => {
      const targetIdx = oldAccts.findIndex(ac => ac.id === accountId);
      const newAccts = [...oldAccts]
      newAccts[targetIdx] = {
        ...newAccts[targetIdx],
        isSelected: !newAccts[targetIdx].isSelected
      }

      return newAccts 
    })
  }

  return (
    <tr>
      <th>
        <label>
          <Checkbox
            isSelected={account.isSelected} 
            onChange={() => toggleSelect(account.id)}/>
        </label>
      </th>
      <td>
        {/* <div className="flex items-center gap-3">
          <div contentEditable={"plaintext-only"} className="font-bold">{account.account_name}</div>
        </div> */}
        <EditableValue 
          content={account.account_name} 
          type="text" onChange={(value => {
            console.log('EditableValue::OnChange')
            mutation.mutate({...account, account_name: value!.toString()}, { onError: (err) => console.error(err) })
          }) /* TODO: set up value edititng */ } />
      </td>
      <th className="flex flex-row justify-center">
        <Link href={`/investments?accountId=${account.id}`} 
          className="btn btn-ghost btn-xs">
          details
        </Link>
      </th>
    </tr>
  )
}