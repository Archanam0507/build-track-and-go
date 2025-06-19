import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Search, Filter, User } from 'lucide-react';
import { mockContacts } from '../utils/mockData';

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const roles = [
    'All', 'Owner', 'Contractor', 'Site Engineer', 'Painter', 'Accountant', 
    'Site Manager', 'Electrician', 'Plumber', 'Mason', 'Carpenter', 'Welder', 
    'Tiles Expert', 'Security Guard', 'Cleaner', 'Steel Worker'
  ];

  // Filter and sort contacts
  const filteredContacts = mockContacts
    .filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.phone.includes(searchTerm) ||
                           contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || contact.role === roleFilter;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'projects':
          return b.projects.length - a.projects.length;
        default:
          return 0;
      }
    });

  const handleCall = (phone: string) => {
    console.log('Calling:', phone);
    window.open(`tel:${phone}`, '_self');
  };

  const handleSMS = (phone: string) => {
    console.log('Sending SMS to:', phone);
    window.open(`sms:${phone}`, '_self');
  };

  const handleWhatsApp = (phone: string) => {
    console.log('Opening WhatsApp for:', phone);
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleEmail = (email: string) => {
    console.log('Sending email to:', email);
    window.open(`mailto:${email}`, '_self');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner': return 'bg-purple-100 text-purple-800';
      case 'Contractor': return 'bg-blue-100 text-blue-800';
      case 'Site Engineer': return 'bg-green-100 text-green-800';
      case 'Painter': return 'bg-yellow-100 text-yellow-800';
      case 'Accountant': return 'bg-red-100 text-red-800';
      case 'Site Manager': return 'bg-indigo-100 text-indigo-800';
      case 'Electrician': return 'bg-orange-100 text-orange-800';
      case 'Plumber': return 'bg-cyan-100 text-cyan-800';
      case 'Mason': return 'bg-stone-100 text-stone-800';
      case 'Carpenter': return 'bg-amber-100 text-amber-800';
      case 'Welder': return 'bg-gray-100 text-gray-800';
      case 'Tiles Expert': return 'bg-teal-100 text-teal-800';
      case 'Security Guard': return 'bg-emerald-100 text-emerald-800';
      case 'Cleaner': return 'bg-lime-100 text-lime-800';
      case 'Steel Worker': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your project team contacts and communication</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="projects">Sort by Projects</option>
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(contact.role)}`}>
                  {contact.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={16} />
                <span className="truncate">{contact.email}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Active Projects</p>
              <p className="text-sm text-gray-600">{contact.projects.length} project{contact.projects.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleCall(contact.phone)}
                className="flex-1 flex items-center justify-center space-x-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Phone size={16} />
                <span>Call</span>
              </button>
              
              <button
                onClick={() => handleSMS(contact.phone)}
                className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <MessageCircle size={16} />
                <span>SMS</span>
              </button>
              
              <button
                onClick={() => handleWhatsApp(contact.phone)}
                className="flex-1 flex items-center justify-center space-x-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </button>
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleEmail(contact.email)}
                className="w-full flex items-center justify-center space-x-1 bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <Mail size={16} />
                <span>Email</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || roleFilter !== 'All' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No contacts available at the moment.'
            }
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {roles.slice(1).map((role) => {
            const count = mockContacts.filter(contact => contact.role === role).length;
            return (
              <div key={role} className="text-center">
                <p className="text-xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-600">{role.replace(' ', '\n')}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
