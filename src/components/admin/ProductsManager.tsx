
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../context/LanguageContext';
import { getCategories, getAllProducts } from '../../data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../../context/CartContext';

// Product Form type
interface ProductFormData {
  id: string;
  name: string;
  category: string;
  cut: string;
  price: number;
  image: string;
  description: string;
}

const ProductsManager: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: getCategories
  });
  
  // Fetch all products
  const { 
    data: productsList = [], 
    refetch: refetchProducts
  } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: getAllProducts
  });
  
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    category: '',
    cut: '',
    price: 0,
    image: '',
    description: ''
  });

  // Update formData.category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({
        ...prev,
        category: categories[0]
      }));
    }
  }, [categories]);

  const handleFormChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      category: categories[0] || '',
      cut: '',
      price: 0,
      image: '',
      description: ''
    });
    setIsEditing(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID if adding new product
    const productId = isEditing ? formData.id : `${formData.category}-${formData.cut}-${Date.now()}`;
    
    const newProduct = {
      ...formData,
      id: productId,
      price: Number(formData.price)
    };
    
    try {
      // Here you would add code to save to Supabase
      // For now, let's just mock this
      if (isEditing) {
        // Update existing product
        toast.success(t('productUpdated'));
      } else {
        // Add new product
        toast.success(t('productAdded'));
      }
      
      // Refetch products
      refetchProducts();
      resetForm();
    } catch (error) {
      toast.error(t('errorSavingProduct'));
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (productId: string) => {
    const productToEdit = productsList.find(p => p.id === productId);
    if (productToEdit) {
      setFormData({
        id: productToEdit.id,
        name: productToEdit.name,
        category: productToEdit.category,
        cut: productToEdit.cut || '',
        price: productToEdit.price,
        image: productToEdit.image || '',
        description: productToEdit.description || ''
      });
      setIsEditing(true);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      // Here you would add code to delete from Supabase
      // For now, let's just mock this
      toast.success(t('productDeleted'));
      
      // Refetch products
      refetchProducts();
    } catch (error) {
      toast.error(t('errorDeletingProduct'));
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === selectedCategory);

  return (
    <div>
      <Tabs defaultValue="list" className="mb-6">
        <TabsList>
          <TabsTrigger value="list">{t('productsList')}</TabsTrigger>
          <TabsTrigger value="add">{isEditing ? t('editProduct') : t('addProduct')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="mb-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{t(cat)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('name')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                    <TableHead>{t('price')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{t(product.category)}</TableCell>
                      <TableCell>{product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <TrashIcon size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t('productName')}
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  {t('category')}
                </label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => handleFormChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{t(cat)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cut" className="text-sm font-medium">
                  {t('cut')}
                </label>
                <Input
                  id="cut"
                  value={formData.cut}
                  onChange={(e) => handleFormChange('cut', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                {t('price')}
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleFormChange('price', parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                {t('imageUrl')}
              </label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleFormChange('image', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                {t('description')}
              </label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">
                <Plus size={16} className="mr-2" />
                {isEditing ? t('updateProduct') : t('addProduct')}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t('cancel')}
                </Button>
              )}
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsManager;
