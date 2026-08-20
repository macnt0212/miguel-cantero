import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Check, 
  Star, 
  Tag, 
  Layers, 
  Eye, 
  ShoppingCart, 
  ShieldCheck, 
  Zap,
  Filter,
  Edit3,
  RotateCcw,
  DollarSign
} from 'lucide-react';
import { PRODUCTS_LIST } from '../data/mockData';
import { ProductItem } from '../types';

interface ProductsSectionProps {
  onAddToCart: (product: ProductItem, customPrice?: number) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProductModal, setSelectedProductModal] = useState<ProductItem | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Manual pricing state map: productId -> customPrice (or null/undefined)
  const [manualPrices, setManualPrices] = useState<Record<string, number>>({});
  const [manualPriceInputs, setManualPriceInputs] = useState<Record<string, string>>({});
  const [isManualPriceModeOpen, setIsManualPriceModeOpen] = useState<boolean>(true);

  const categories = [
    { id: 'all', label: 'Todo el Catálogo' },
    { id: 'pc_laptops', label: 'PCs & Laptops' },
    { id: 'seguridad', label: 'CCTV & Seguridad' },
    { id: 'redes', label: 'Redes & Enlaces' },
    { id: 'impresoras', label: 'Impresoras' },
    { id: 'automatizacion', label: 'Domótica & IoT' },
    { id: 'componentes', label: 'Componentes' },
  ];

  const getEffectivePrice = (product: ProductItem): number => {
    if (manualPrices[product.id] !== undefined) {
      return manualPrices[product.id];
    }
    return product.price;
  };

  const handlePriceInputChange = (productId: string, value: string) => {
    setManualPriceInputs(prev => ({ ...prev, [productId]: value }));
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) {
      setManualPrices(prev => ({ ...prev, [productId]: parsed }));
    } else if (value === '') {
      setManualPrices(prev => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    }
  };

  const handleResetProductPrice = (productId: string) => {
    setManualPrices(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    setManualPriceInputs(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleResetAllPrices = () => {
    setManualPrices({});
    setManualPriceInputs({});
  };

  const filteredProducts = PRODUCTS_LIST.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: ProductItem) => {
    const effectivePrice = getEffectivePrice(product);
    onAddToCart({ ...product, price: effectivePrice });
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="tienda" className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Distribución y Venta Directa con Factura A / B</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hardware, Equipamiento & Componentes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Catálogo de equipamiento técnico. Puedes editar e ingresar manualmente el precio de cada producto para cotizaciones y presupuestos a medida.
            </p>
          </div>

          {/* Controls toolbar */}
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setIsManualPriceModeOpen(!isManualPriceModeOpen)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                isManualPriceModeOpen
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isManualPriceModeOpen ? 'Precios Manuales Activos' : 'Activar Edición Manual'}</span>
            </button>

            {Object.keys(manualPrices).length > 0 && (
              <button
                type="button"
                onClick={handleResetAllPrices}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5"
                title="Restablecer todos los precios"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            )}

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Informative Banner about Manual Pricing */}
        {isManualPriceModeOpen && (
          <div className="mb-6 p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 font-bold">
                $
              </div>
              <div>
                <strong className="text-white block font-bold">Colocación Manual de Precios Habilitada</strong>
                <span className="text-slate-400 text-[11px]">
                  Escribe el importe deseado en la casilla de cada producto para cotizar con tus propios valores de venta o presupuesto.
                </span>
              </div>
            </div>
            {Object.keys(manualPrices).length > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold shrink-0">
                {Object.keys(manualPrices).length} precio(s) personalizado(s)
              </span>
            )}
          </div>
        )}

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-btn-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md scale-102 font-extrabold'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedAnimationId === product.id;
            const isCustom = manualPrices[product.id] !== undefined;
            const currentPrice = getEffectivePrice(product);
            const inputValue = manualPriceInputs[product.id] !== undefined 
              ? manualPriceInputs[product.id] 
              : currentPrice.toString();

            return (
              <div
                key={product.id}
                className={`bg-slate-900/80 border rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-cyan-950/20 group ${
                  isCustom ? 'border-cyan-500/60 ring-1 ring-cyan-500/20' : 'border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  {/* Image wrapper */}
                  <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800/80">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.featured && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                        Destacado
                      </span>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-bold text-[10px] border border-cyan-500/20">
                      {product.brand}
                    </span>
                  </div>

                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-slate-200">{product.rating}</span>
                      <span className="text-slate-500">({product.reviewsCount})</span>
                    </div>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Stock ({product.stockCount} disp.)
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {/* Quick specs pill */}
                  <div className="space-y-1 mb-3">
                    {product.specs.slice(0, 2).map((sp, idx) => (
                      <div key={idx} className="text-[11px] text-slate-300 truncate bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                        • {sp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-3 border-t border-slate-800/80">
                  {/* Manual / Editable Price Box */}
                  <div className="mb-3 bg-slate-950/90 rounded-xl p-2.5 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-cyan-400" />
                        <span>Precio Unitario (ARS):</span>
                      </span>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => handleResetProductPrice(product.id)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 underline font-bold"
                          title="Volver al precio de lista"
                        >
                          Restablecer
                        </button>
                      )}
                    </div>

                    <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-slate-400 font-bold text-xs">$</span>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={inputValue}
                        onChange={(e) => handlePriceInputChange(product.id, e.target.value)}
                        placeholder="Ingresar precio manual..."
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg pl-6 pr-2 py-1.5 text-sm font-mono font-bold text-white focus:outline-none transition-colors"
                      />
                    </div>
                    {isCustom && (
                      <div className="text-[10px] text-cyan-300 mt-1 flex items-center gap-1 font-semibold">
                        <Check className="w-3 h-3 text-cyan-400" />
                        <span>Precio fijado manualmente</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    <button
                      id={`view-prod-btn-${product.id}`}
                      onClick={() => setSelectedProductModal(product)}
                      className="col-span-2 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 border border-slate-700 transition-colors"
                      title="Ver ficha técnica"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Detalle</span>
                    </button>

                    <button
                      id={`add-prod-btn-${product.id}`}
                      onClick={() => handleAddToCart(product)}
                      className={`col-span-3 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Cotizar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No encontramos productos con ese término de búsqueda.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline font-bold"
            >
              Restablecer filtros del catálogo
            </button>
          </div>
        )}

        {/* Product Quickview Modal */}
        {selectedProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{selectedProductModal.categoryLabel}</span>
                  <h3 className="text-xl font-black text-white mt-1">{selectedProductModal.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover rounded-2xl border border-slate-800"
                />
                <div className="space-y-3 text-xs">
                  <p className="text-slate-300 leading-relaxed">{selectedProductModal.description}</p>
                  <div>
                    <strong className="text-slate-100 block mb-1">Especificaciones Técnicas:</strong>
                    <ul className="space-y-1 text-slate-300">
                      {selectedProductModal.specs.map((sp, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400">Marca Oficial: </span>
                    <strong className="text-cyan-300">{selectedProductModal.brand}</strong>
                  </div>
                </div>
              </div>

              {/* Editable Price inside modal */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="w-full sm:w-60">
                  <span className="text-[11px] text-slate-400 block mb-1">Precio Unitario para Cotizar (ARS):</span>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-slate-400 font-bold text-xs">$</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={
                        manualPriceInputs[selectedProductModal.id] !== undefined
                          ? manualPriceInputs[selectedProductModal.id]
                          : getEffectivePrice(selectedProductModal).toString()
                      }
                      onChange={(e) => handlePriceInputChange(selectedProductModal.id, e.target.value)}
                      placeholder="Precio manual..."
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-lg pl-6 pr-2 py-1.5 text-sm font-mono font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProductModal);
                    setSelectedProductModal(null);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md self-end sm:self-auto"
                >
                  Añadir a Cotización / Carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

