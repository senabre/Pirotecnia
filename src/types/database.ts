export interface Database {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string;
          nombre: string;
          direccion: string;
          provincia: string;
          poblacion: string;
          tipo_acto: string;
          dia_disparo: string;
          lugar_disparo: string;
          hora_disparo: string;
          materiales_varios: string | null;
          observaciones: string | null;
          foto_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['clientes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['clientes']['Insert']>;
      };
    };
  };
}