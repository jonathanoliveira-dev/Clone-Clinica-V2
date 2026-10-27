mensagem: str = "Cuidados diários ajudam a manter um sorriso saudável."

dicas: list[str] = [
    "Escove os dentes com regularidade.",
    "Use fio dentário conforme orientação profissional.",
    "Mantenha consultas regulares com um profissional de saúde oral.",
]

print(mensagem)
print("\nDicas:")

for numero, dica in enumerate(dicas, start=1):
    print(f"{numero}. {dica}")