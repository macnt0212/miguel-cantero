import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  DollarSign,
  Edit2
} from 'lucide-react';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onUpdatePrice?: (productId: string, newPrice: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onUpdatePrice,
  onRemoveItem,
  onClearCart
}) => {
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  const handleSendWhatsappOrder = () => {
    if (cartItems.length === 0) return;

    let text = `Hola M&C Informática! Quiero solicitar presupuesto / compra para los siguientes productos del catálogo:%0A%0A`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toLocaleString('es-AR')} [Unitario: $${item.product.price.toLocaleString('es-AR')}]%0A`;
    });
    text += `%0ATotal Estimado: $${totalAmount.toLocaleString('es-AR')}%0A%0A¿Tienen disponibilidad para entrega o retiro en Formosa?`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-cyan-500/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                Cotización / Carrito ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">Tu carrito de cotización está vacío</p>
                <p className="text-xs text-slate-500">
                  Explora nuestro catálogo de hardware y servicios para agregar equipos con precio manual.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                    
                    {/* Unit Price with edit option */}
                    <div className="flex items-center gap-2 mt-1">
                      {editingPriceId === item.product.id && onUpdatePrice ? (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">$</span>
                          <input
                            type="number"
                            min="0"
                            step="100"
                            value={item.product.price}
                            onChange={(e) => onUpdatePrice(item.product.id, Math.max(0, Number(e.target.value)))}
                            className="w-24 bg-slate-900 border border-cyan-400 rounded px-1.5 py-0.5 text-xs text-white font-mono"
                          />
                          <button
                            onClick={() => setEditingPriceId(null)}
                            className="text-[10px] text-cyan-400 font-bold hover:underline"
                          >
                            Listo
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-cyan-400 font-mono font-bold">
                            ${item.product.price.toLocaleString('es-AR')} c/u
                          </span>
                          {onUpdatePrice && (
                            <button
                              onClick={() => setEditingPriceId(item.product.id)}
                              className="text-slate-500 hover:text-cyan-300 transition-colors"
                              title="Editar precio manual"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white font-mono px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    title="Eliminar del carrito"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal de Equipamiento:</span>
                  <span className="font-mono text-white font-semibold">
                    ${totalAmount.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Garantía Escrita:</span>
                  <span className="text-emerald-400 font-semibold">Oficial Incluida</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Estimado:</span>
                  <span className="text-cyan-300 font-mono">
                    ${totalAmount.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  id="checkout-whatsapp-btn"
                  onClick={handleSendWhatsappOrder}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Pedido a Asesor por WhatsApp</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={onClearCart}
                    className="w-1/2 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    onClick={onClose}
                    className="w-1/2 py-2 rounded-xl text-xs font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 transition-colors"
                  >
                    Seguir Viendo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

