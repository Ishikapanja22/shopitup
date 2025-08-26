import React from 'react';

const CategoriesPage = () => {
  const categories = [
    {
      icon: 'fas fa-tshirt',
      title: 'Fashion & Apparel',
      description: 'Trendy clothing, shoes, and accessories for all occasions',
      button: 'Browse Fashion',
    },
    {
      icon: 'fas fa-laptop',
      title: 'Electronics',
      description: 'Latest gadgets, computers, and electronic devices',
      button: 'Browse Electronics',
    },
    {
      icon: 'fas fa-home',
      title: 'Home & Garden',
      description: 'Everything for your home, garden, and outdoor spaces',
      button: 'Browse Home',
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Sports & Fitness',
      description: 'Sports equipment, fitness gear, and outdoor activities',
      button: 'Browse Sports',
    },
    {
      icon: 'fas fa-book',
      title: 'Books & Media',
      description: 'Books, movies, music, and educational materials',
      button: 'Browse Books',
    },
    {
      icon: 'fas fa-gamepad',
      title: 'Gaming',
      description: 'Video games, consoles, and gaming accessories',
      button: 'Browse Gaming',
    },
  ];

  return (
    <div className="page active" style={{ marginTop: '76px', padding: '50px 0' }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: 'var(--maroon)' }}>Product Categories</h2>
        <div className="row">
          {categories.map((cat, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="category-card card h-100 text-center p-4">
                <i className={`${cat.icon} fa-4x mb-3`} style={{ color: 'var(--maroon)' }}></i>
                <h4>{cat.title}</h4>
                <p>{cat.description}</p>
                <button className="btn btn-maroon mt-auto">{cat.button}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
