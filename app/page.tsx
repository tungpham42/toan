export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Welcome to the Math Tool
          </span>
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <p className="text-lg text-gray-600 mb-4">
            Explore a collection of powerful mathematical tools designed to
            simplify calculations, solve equations, and more.
          </p>
          <p className="text-gray-600 font-medium">
            From prime factorization to matrix operations, our tools provide
            accurate and user-friendly solutions for all your math needs. Choose
            a tool from the navigation above to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
