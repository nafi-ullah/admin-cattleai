import CattleList from "./components/CattleList";


export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center my-6">Cattle Predictions</h1>
      <CattleList />
    </main>
  );
}
