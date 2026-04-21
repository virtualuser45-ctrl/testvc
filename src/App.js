import React, { useState, useMemo } from 'react';
import { PlusCircle, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function CashBook() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const addTransaction = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    setTransactions([...transactions, { id: Date.now(), description, amount: parseFloat(amount), type }]);
    setDescription('');
    setAmount('');
  };

  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));

  const balance = useMemo(() => transactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0), [transactions]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Cash Book</h1>
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <p className="text-sm text-gray-500">Current Balance</p>
        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>${balance.toFixed(2)}</p>
      </div>
      <form onSubmit={addTransaction} className="space-y-3 mb-6">
        <input className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" className="w-full p-2 border rounded" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select className="w-full p-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          <PlusCircle size={20} /> Add Transaction
        </button>
      </form>
      <div className="space-y-2">
        {transactions.map(t => (
          <div key={t.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center gap-3">
              {t.type === 'income' ? <ArrowUpCircle className="text-green-500" /> : <ArrowDownCircle className="text-red-500" />}
              <span>{t.description}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}</span>
              <button onClick={() => deleteTransaction(t.id)}><Trash2 size={16} className="text-gray-400 hover:text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}