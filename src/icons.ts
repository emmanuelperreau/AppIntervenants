import { createIcons, Phone, Smartphone, Download, X, Key, Car, Palmtree, Lock, Quote, HeartHandshake, Target, Award, Users, Sun, CalendarClock, Calculator, ChevronRight, Euro, Sparkles, Crown, TrendingUp, Utensils, CheckCircle, Gift, CalendarDays, Info, PhoneCall, QrCode, HardHat, BookOpen, Footprints, Shirt, ShieldCheck, Ban, XCircle, AlignStartVertical, Weight, Briefcase, Clock, ClipboardList, MessageCircle, EyeOff, Heart, Ear, Headset, AlertOctagon, ArrowLeftRight, FileEdit, CigaretteOff, Baby, Scale, Gem, Stethoscope, Coins, Timer, Shield, ShieldAlert, Building2, MapPin, Mail, DoorClosed, AlertTriangle, Ambulance, HeartPulse, Home, CalendarCheck, FileText, Share, PlusSquare, EllipsisVertical, ExternalLink } from 'lucide';

export const APP_ICONS = { Phone, Smartphone, Download, X, Key, Car, Palmtree, Lock, Quote, HeartHandshake, Target, Award, Users, Sun, CalendarClock, Calculator, ChevronRight, Euro, Sparkles, Crown, TrendingUp, Utensils, CheckCircle, Gift, CalendarDays, Info, PhoneCall, QrCode, HardHat, BookOpen, Footprints, Shirt, ShieldCheck, Ban, XCircle, AlignStartVertical, Weight, Briefcase, Clock, ClipboardList, MessageCircle, EyeOff, Heart, Ear, Headset, AlertOctagon, ArrowLeftRight, FileEdit, CigaretteOff, Baby, Scale, Gem, Stethoscope, Coins, Timer, Shield, ShieldAlert, Building2, MapPin, Mail, DoorClosed, AlertTriangle, Ambulance, HeartPulse, Home, CalendarCheck, FileText, Share, PlusSquare, EllipsisVertical, ExternalLink };

export function initIcons(): void {
    createIcons({ icons: APP_ICONS, attrs: { 'aria-hidden': 'true' } });
}

export { createIcons };
