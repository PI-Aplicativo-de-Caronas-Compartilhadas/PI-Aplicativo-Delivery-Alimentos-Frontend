function Footer() {
    let data = new Date().getFullYear()

    return (
        <div className="flex justify-center bg-[#022110] text-[#d0fbe3] border-t border-[#042f17]">
            <div className="container flex flex-col items-center py-6 px-4">
                <p className='text-base font-bold text-[#a0f8c6] mb-2'>
                    NUTRIGO - Alimentação Saudável
                </p>
                <p className='text-xs text-[#71f4aa] tracking-wide'>
                    Copyright © {data}. Todos os direitos reservados.
                </p>
            </div>
        </div>
    )
}

export default Footer