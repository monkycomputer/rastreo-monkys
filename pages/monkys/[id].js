import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PedidoRastreo() {
  const router = useRouter();
  const { id } = router.query;
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, "pedidos", id), (docSnap) => {
      if (docSnap.exists()) {
        setPedido(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, [id]);

  if (!pedido) return <p style={{ textAlign: 'center' }}>Cargando rastreo del pedido...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <img src="/monkys_perfil_negro.png" alt="Logo Monky's" style={{ maxWidth: 180 }} />
      <h2>Hola, tu pedido ya va en camino 🛵🔥</h2>
      <iframe
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: 8 }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${pedido.ubicacion_lat},${pedido.ubicacion_lng}&z=15&output=embed`}
      ></iframe>
      <div style={{ marginTop: 20, fontSize: '1rem', textAlign: 'left', padding: '1rem' }}>
        <p><strong>Pedido:</strong> #{id}</p>
        <p><strong>Estado:</strong> {pedido.estado}</p>
        <p><strong>Repartidor:</strong> {pedido.repartidor_nombre}</p>
        <p><strong>Última actualización:</strong> {new Date(pedido.ultima_actualizacion.seconds * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
