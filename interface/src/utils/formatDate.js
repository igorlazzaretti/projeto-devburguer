

export function formatDate(date) {
  const data = new Date(date);

  const dia = data.toLocaleString('pt-BR', { day: '2-digit' });
  const mes = data.toLocaleString('pt-BR', { month: 'short' }).replace('.', '').replace(/^./, c => c.toUpperCase());
  const ano = data.toLocaleString('pt-BR', { year: '2-digit' });
  const hora = data.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return `${dia} ${mes}. ${ano}, ${hora}`;
}
