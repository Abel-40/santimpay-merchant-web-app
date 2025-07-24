// stores/usePinnedStore.ts
import { defineStore } from 'pinia'
import type { PinnedTransType } from '@/types/Types'
import type { TransactionType } from '@/types/Types'
export const usePinnedStore = defineStore('pinnedTansactions', {
  state: () => ({
    pinnedTransactions: [] as PinnedTransType[],
    pendingTransaction: null as TransactionType | null,
  }),
  actions: {
    unpin(transactionId: string) {
      this.pinnedTransactions = this.pinnedTransactions.filter(
        (t) => t?.trans?.transactionId !== transactionId,
      )
    },
    isPinned(transaction?: TransactionType) {
      if (!transaction) return false

      return this.pinnedTransactions.some(
        (t) => t?.trans?.transactionId === transaction.transactionId,
      )
    },
    setPendingTransaction(transaction: TransactionType) {
      this.pendingTransaction = transaction
    },
    addNoteAndPin(note: string = '') {
      if (this.pendingTransaction?.transactionId) {
        const alreadyPinned = this.pinnedTransactions.find(
          (t) => t?.trans?.transactionId === this.pendingTransaction?.transactionId,
        )
        if (!alreadyPinned) {
          this.pinnedTransactions.push({
            trans: {...this.pendingTransaction},
            note,
          })
        }
        this.pendingTransaction = null
      }
    },
  },
  persist: true,
})
