import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const rows = [
    { uk: '8 / XS', eu: '36', us: '4', bustCm: '82-85', waistCm: '64-67', hipCm: '90-93', bustIn: '32-33.5', waistIn: '25-26.5', hipIn: '35.5-36.5' },
    { uk: '10 / S', eu: '38', us: '6', bustCm: '86-89', waistCm: '68-71', hipCm: '94-97', bustIn: '34-35', waistIn: '27-28', hipIn: '37-38' },
    { uk: '12 / M', eu: '40', us: '8', bustCm: '90-94', waistCm: '72-76', hipCm: '98-102', bustIn: '35.5-37', waistIn: '28.5-30', hipIn: '38.5-40' },
    { uk: '14 / L', eu: '42', us: '10', bustCm: '95-99', waistCm: '77-81', hipCm: '103-107', bustIn: '37.5-39', waistIn: '30.5-32', hipIn: '40.5-42' },
    { uk: '16 / XL', eu: '44', us: '12', bustCm: '100-105', waistCm: '82-87', hipCm: '108-113', bustIn: '39.5-41.5', waistIn: '32.5-34.5', hipIn: '42.5-44.5' },
    { uk: '18 / XXL', eu: '46', us: '14', bustCm: '106-112', waistCm: '88-94', hipCm: '114-120', bustIn: '42-44', waistIn: '35-37', hipIn: '45-47' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151515]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F8F6F2] shadow-2xl border border-[#D8CEC1] p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#151515] hover:opacity-60 transition-opacity"
          aria-label="Close size guide"
        >
          <X size={20} strokeWidth={1.3} />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.28em] uppercase text-[#B9A58C] font-sans mb-1">
            <Ruler size={13} />
            <span>ATELIER PROPORTIONS</span>
          </div>
          <h2 className="font-editorial text-3xl text-[#151515] font-normal tracking-[0.02em]">
            SIZE & MEASUREMENT GUIDE
          </h2>
          <p className="text-xs text-[#7A7570] font-light mt-1">
            Our midi dresses are engineered to flatter the female form with tailored ease.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end mb-4">
          <div className="border border-[#D8CEC1] p-0.5 flex text-[10px] tracking-[0.16em] uppercase">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-medium transition-colors ${unit === 'cm' ? 'bg-[#151515] text-[#F8F6F2]' : 'text-[#7A7570]'}`}
            >
              CENTIMETERS (CM)
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 font-medium transition-colors ${unit === 'in' ? 'bg-[#151515] text-[#F8F6F2]' : 'text-[#7A7570]'}`}
            >
              INCHES (IN)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-t border-b border-[#D8CEC1]">
          <table className="w-full text-left text-xs text-[#151515]">
            <thead>
              <tr className="border-b border-[#D8CEC1]/80 text-[10px] tracking-[0.2em] uppercase text-[#7A7570] bg-[#EFECE6]/50">
                <th className="py-3 px-3">UK / IRL</th>
                <th className="py-3 px-3">EU</th>
                <th className="py-3 px-3">US</th>
                <th className="py-3 px-3">BUST</th>
                <th className="py-3 px-3">WAIST</th>
                <th className="py-3 px-3">HIPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8CEC1]/40">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-[#EFECE6]/30 transition-colors">
                  <td className="py-3 px-3 font-medium">{r.uk}</td>
                  <td className="py-3 px-3 text-[#7A7570]">{r.eu}</td>
                  <td className="py-3 px-3 text-[#7A7570]">{r.us}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${r.bustCm} cm` : `${r.bustIn} in`}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${r.waistCm} cm` : `${r.waistIn} in`}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${r.hipCm} cm` : `${r.hipIn} in`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Guide Tip */}
        <div className="mt-6 p-4 bg-[#EFECE6] text-xs text-[#4A4744] font-light space-y-2">
          <p className="font-medium text-[#151515] text-[11px] tracking-[0.16em] uppercase">
            HOW TO MEASURE
          </p>
          <p>
            <strong>Bust:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
          </p>
          <p>
            <strong>Waist:</strong> Measure around the narrowest natural crease of your torso.
          </p>
          <p>
            <strong>Between Sizes?</strong> For wrap dresses (e.g. Lola), we recommend taking your true size or sizing up if between cup sizes for comfortable coverage.
          </p>
        </div>

      </div>
    </div>
  );
};
