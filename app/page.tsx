export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-6">
        Welcome to the Math Tool
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore a collection of powerful mathematical tools designed to simplify
        calculations, solve equations, and more. Choose a tool from the
        navigation above to get started.
      </p>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <p className="text-gray-700 font-medium">
          From prime factorization to matrix operations, our tools provide
          accurate and user-friendly solutions for all your math needs.
        </p>
      </div>
    </div>
  );
}
