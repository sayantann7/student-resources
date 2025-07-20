

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Resource {
  "Program Name": string;
  "Program Value": string;
  "Tags": string[];
  "Description": string;
  "Program Company Icon"?: string;
  "Apply Link": string;
}

interface ResourceData {
  tools_and_software: Resource[];
  certifications_and_courses: Resource[];
  scholarships_and_fellowships: Resource[];
  internships_and_mentorship: Resource[];
}

export default function Home() {
  const [resources, setResources] = useState<ResourceData | null>(null);
  const [activeCategory, setActiveCategory] = useState('tools_and_software');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/resources.json')
      .then(response => response.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error loading resources:', error));
  }, []);

  const categories = [
    { key: 'tools_and_software', label: 'Tools & Software', icon: '🛠️' },
    { key: 'certifications_and_courses', label: 'Certifications & Courses', icon: '🎓' },
    { key: 'scholarships_and_fellowships', label: 'Scholarships & Fellowships', icon: '💰' },
    { key: 'internships_and_mentorship', label: 'Internships & Mentorship', icon: '🚀' }
  ];

  const filteredResources = resources && resources[activeCategory as keyof ResourceData]
    ? resources[activeCategory as keyof ResourceData].filter(resource => 
        resource["Program Name"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.Tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-start items-center text-white relative bg-[url('/bg.png')] pt-[140px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        
        {/* Hero content */}
        <motion.div 
          className="relative z-10 text-center px-4 max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl mb-6 leading-tight"
            style={{ fontFamily: 'The Seasons, serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Free Tools for Students
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Curated free tools for <span style={{ fontFamily: 'The Seasons', fontWeight: 700 }}>Students, Dreamers, and Makers</span>. In a world of noise, cut the noise and build with clarity.
          </motion.p>
          
          <motion.button 
            className="relative px-8 py-2 pt-3 rounded-full text-lg font-medium transition-all duration-300 overflow-hidden text-white hover:scale-105"
            style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.5),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 4px 2px rgba(255, 255, 255, 0.2)
              `
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const resourcesSection = document.getElementById('resources-section');
              resourcesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">Get Started</span>
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
              }}
            />
            <div 
              className="absolute top-0 left-0 w-px h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Resources Section */}
      <motion.div 
        id="resources-section"
        className="min-h-screen bg-white py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-5xl mb-4 text-gray-900"
              style={{ fontFamily: 'The Seasons, serif', fontWeight: 700 }}
            >
              Explore Resources
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Discover 100+ of free tools, courses, and opportunities designed specifically for students
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 bg-white shadow-md"
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  activeCategory === category.key 
                    ? 'text-gray-800' 
                    : 'text-gray-700 hover:text-gray-800'
                }`}
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  background: activeCategory === category.key 
                    ? 'rgba(255, 255, 255, 0.35)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: activeCategory === category.key ? 'blur(15px)' : 'blur(8px)',
                  WebkitBackdropFilter: activeCategory === category.key ? 'blur(15px)' : 'blur(8px)',
                  border: activeCategory === category.key 
                    ? '1px solid rgba(255, 255, 255, 0.5)' 
                    : '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: activeCategory === category.key 
                    ? `
                      0 12px 40px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8),
                      inset 0 -1px 0 rgba(255, 255, 255, 0.3),
                      inset 0 0 6px 3px rgba(255, 255, 255, 0.4)
                    `
                    : `
                      0 4px 16px rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3),
                      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                      inset 0 0 2px 1px rgba(255, 255, 255, 0.15)
                    `
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
                {/* Glassmorphism highlight lines for all tabs */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: activeCategory === category.key 
                      ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                  }}
                />
                <div 
                  className="absolute top-0 left-0 w-px h-full"
                  style={{
                    background: activeCategory === category.key 
                      ? 'linear-gradient(180deg, rgba(255, 255, 255, 1), transparent, rgba(255, 255, 255, 0.5))'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent, rgba(255, 255, 255, 0.2))'
                  }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Resources Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:border-gray-300 group bg-white shadow-lg hover:shadow-xl flex flex-col h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * (index % 9) }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.15 } }}
                viewport={{ once: true }}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Program Icon */}
                  {resource["Program Company Icon"] && (
                    <div className="mb-4">
                      <img 
                        src={resource["Program Company Icon"]} 
                        alt={resource["Program Name"]}
                        className="w-12 h-12 object-contain rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Program Name */}
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    style={{ fontFamily: 'Helvetica, serif', fontWeight: 700 }}
                  >
                    {resource["Program Name"]}
                  </h3>

                  {/* Program Value */}
                  <div className="mb-3">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium relative overflow-hidden text-gray-700"
                      style={{ 
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: `
                          0 4px 16px rgba(0, 0, 0, 0.1),
                          inset 0 1px 0 rgba(255, 255, 255, 0.5),
                          inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 0 2px 1px rgba(255, 255, 255, 0.2)
                        `
                      }}
                    >
                      {resource["Program Value"]}
                      <div 
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                        }}
                      />
                      <div 
                        className="absolute top-0 left-0 w-px h-full"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
                        }}
                      />
                    </span>
                  </div>

                  {/* Description */}
                  <p 
                    className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {resource.Description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.Tags?.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 rounded-full text-xs relative overflow-hidden text-gray-600"
                        style={{ 
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(5px)',
                          WebkitBackdropFilter: 'blur(5px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: `
                            0 2px 8px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                            inset 0 0 2px 1px rgba(255, 255, 255, 0.2)
                          `
                        }}
                      >
                        {tag}
                        <div 
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
                          }}
                        />
                      </span>
                    ))}
                    {resource.Tags?.length > 3 && (
                      <span 
                        className="px-2 py-1 rounded-full text-xs relative overflow-hidden text-gray-600"
                        style={{ 
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(5px)',
                          WebkitBackdropFilter: 'blur(5px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: `
                            0 2px 8px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                            inset 0 0 2px 1px rgba(255, 255, 255, 0.2)
                          `
                        }}
                      >
                        +{resource.Tags.length - 3} more
                        <div 
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
                          }}
                        />
                      </span>
                    )}
                  </div>

                  {/* Apply Link */}
                  <div className="mt-auto">
                    <motion.a
                      href={resource["Apply Link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden text-gray-700 w-full justify-center"
                      style={{
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.1),
                          inset 0 1px 0 rgba(255, 255, 255, 0.5),
                          inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 0 4px 2px rgba(255, 255, 255, 0.2)
                        `
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Apply Now</span>
                      <span className="ml-2 relative z-10">→</span>
                      <div 
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                        }}
                      />
                      <div 
                        className="absolute top-0 left-0 w-px h-full"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
                        }}
                      />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading State */}
          {!resources && (
            <motion.div 
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-700 text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Loading resources...
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {resources && filteredResources.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                No resources found matching your search.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
